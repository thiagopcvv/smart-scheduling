<?php

namespace Tests\Unit;

use Tests\TestCase;
use App\Services\Central\TenantService;
use App\Repositories\Central\TenantRepository;
use Illuminate\Foundation\Testing\WithFaker;
use Mockery;
use App\Models\Central\Tenant;

class TenantServiceTest extends TestCase
{
    use WithFaker;

    protected $tenantRepositoryMock;
    protected $tenantService;

    protected function setUp(): void
    {
        parent::setUp();

        $this->tenantRepositoryMock = Mockery::mock(TenantRepository::class);
        $this->app->instance(TenantRepository::class, $this->tenantRepositoryMock);

        $this->tenantService = new TenantService();
    }

    public function test_it_should_get_all_tenants()
    {
        $expected = [['id' => 1, 'name' => 'Tenant A']];

        $this->tenantRepositoryMock
            ->shouldReceive('getAll')
            ->once()
            ->andReturn($expected);

        $result = $this->tenantService->getAll();

        $this->assertEquals($expected, $result);
    }

    public function test_it_should_get_a_single_tenant_by_id()
    {
        $tenantId = 1;
        $expected = ['id' => $tenantId, 'name' => 'Tenant A'];

        $this->tenantRepositoryMock
            ->shouldReceive('getById')
            ->with($tenantId)
            ->once()
            ->andReturn($expected);

        $result = $this->tenantService->get($tenantId);

        $this->assertEquals($expected, $result);
    }

    public function test_it_should_store_a_tenant_and_create_domain()
    {
        $data = [
            'name' => 'Tenant Test',
            'domain' => 'tenant.test',
        ];

        $tenantMock = Mockery::mock(Tenant::class);
        $tenantMock->shouldReceive('domains->create')
            ->with(['domain' => $data['domain']])
            ->once();

        $this->tenantRepositoryMock
            ->shouldReceive('store')
            ->with($data)
            ->once()
            ->andReturn($tenantMock);

        $this->tenantService->store($data);

        $this->assertTrue(true);
    }

    public function test_it_should_update_a_tenant()
    {
        $data = ['id' => 1, 'name' => 'Updated Tenant'];
        $expected = ['id' => 1, 'name' => 'Updated Tenant'];

        $this->tenantRepositoryMock
            ->shouldReceive('update')
            ->with($data)
            ->once()
            ->andReturn($expected);

        $result = $this->tenantService->update($data);

        $this->assertEquals($expected, $result);
    }

    protected function tearDown(): void
    {
        Mockery::close();
        parent::tearDown();
    }
}
