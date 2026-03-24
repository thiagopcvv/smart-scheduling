import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { router } from '@inertiajs/react';
import { useState, useMemo } from 'react';
import type { Permission } from '@/types/permission';

type UserWithVinculo = {
    id: number;
    name: string;
    email: string;
    vinculo: boolean;
};

type PermissionFormProps = {
    roleId: number;
    permissions: Permission[];
    users: UserWithVinculo[];
};

export function PermissionForm({ roleId, permissions, users }: PermissionFormProps) {
    const [selectedPermissions, setSelectedPermissions] = useState<number[]>(
        permissions.filter((p) => p.vinculo).map((p) => p.id),
    );
    const [selectedUsers, setSelectedUsers] = useState<number[]>(
        users.filter((u) => u.vinculo).map((u) => u.id),
    );
    const [searchUser, setSearchUser] = useState('');
    const [searchPermission, setSearchPermission] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const filteredUsers = useMemo(() => {
        if (!searchUser) return users;
        const term = searchUser.toLowerCase();
        return users.filter(
            (u) => u.name.toLowerCase().includes(term) || u.email.toLowerCase().includes(term),
        );
    }, [users, searchUser]);

    const filteredPermissions = useMemo(() => {
        if (!searchPermission) return permissions;
        const term = searchPermission.toLowerCase();
        return permissions.filter((p) => p.name.toLowerCase().includes(term));
    }, [permissions, searchPermission]);

    function togglePermission(id: number) {
        setSelectedPermissions((prev) =>
            prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id],
        );
    }

    function toggleUser(id: number) {
        setSelectedUsers((prev) =>
            prev.includes(id) ? prev.filter((uid) => uid !== id) : [...prev, id],
        );
    }

    function toggleAllPermissions(checked: boolean) {
        setSelectedPermissions(checked ? filteredPermissions.map((p) => p.id) : []);
    }

    function toggleAllUsers(checked: boolean) {
        setSelectedUsers(checked ? filteredUsers.map((u) => u.id) : []);
    }

    function onSubmit() {
        setIsSubmitting(true);
        router.post(
            route('tenant-permission.sync', roleId),
            {
                permissions: selectedPermissions,
                users: selectedUsers,
            },
            {
                onFinish: () => setIsSubmitting(false),
            },
        );
    }

    const allPermissionsSelected =
        filteredPermissions.length > 0 && filteredPermissions.every((p) => selectedPermissions.includes(p.id));
    const allUsersSelected =
        filteredUsers.length > 0 && filteredUsers.every((u) => selectedUsers.includes(u.id));

    return (
        <div className="space-y-6">
            {/* Seção Usuários */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg font-semibold">Usuários</CardTitle>
                    <div className="mt-2">
                        <Input
                            placeholder="Buscar usuário..."
                            value={searchUser}
                            onChange={(e) => setSearchUser(e.target.value)}
                        />
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="border-b pb-2 mb-2">
                        <label className="flex items-center gap-3 cursor-pointer text-sm font-medium text-muted-foreground">
                            <Checkbox
                                checked={allUsersSelected}
                                onCheckedChange={(checked) => toggleAllUsers(!!checked)}
                            />
                            Selecionar todos
                        </label>
                    </div>
                    <div className="grid gap-2 max-h-64 overflow-y-auto sm:grid-cols-2 lg:grid-cols-3">
                        {filteredUsers.map((user) => (
                            <label
                                key={user.id}
                                className="flex items-center gap-3 rounded-md border p-3 cursor-pointer transition-colors hover:bg-accent"
                            >
                                <Checkbox
                                    checked={selectedUsers.includes(user.id)}
                                    onCheckedChange={() => toggleUser(user.id)}
                                />
                                <div className="leading-tight">
                                    <span className="text-sm font-medium">{user.name}</span>
                                    <span className="block text-xs text-muted-foreground">{user.email}</span>
                                </div>
                            </label>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Seção Permissões */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg font-semibold">Permissões</CardTitle>
                    <div className="mt-2">
                        <Input
                            placeholder="Buscar permissão..."
                            value={searchPermission}
                            onChange={(e) => setSearchPermission(e.target.value)}
                        />
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="border-b pb-2 mb-2">
                        <label className="flex items-center gap-3 cursor-pointer text-sm font-medium text-muted-foreground">
                            <Checkbox
                                checked={allPermissionsSelected}
                                onCheckedChange={(checked) => toggleAllPermissions(!!checked)}
                            />
                            Selecionar todas
                        </label>
                    </div>
                    <div className="grid gap-2 max-h-64 overflow-y-auto sm:grid-cols-2 lg:grid-cols-3">
                        {filteredPermissions.map((permission) => (
                            <label
                                key={permission.id}
                                className="flex items-center gap-3 rounded-md border p-3 cursor-pointer transition-colors hover:bg-accent"
                            >
                                <Checkbox
                                    checked={selectedPermissions.includes(permission.id)}
                                    onCheckedChange={() => togglePermission(permission.id)}
                                />
                                <span className="text-sm font-medium">{permission.name}</span>
                            </label>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Ações */}
            <div className="flex gap-4">
                <Button onClick={onSubmit} disabled={isSubmitting}>
                    {isSubmitting ? 'Salvando...' : 'Salvar'}
                </Button>
                <Button type="button" variant="outline" onClick={() => router.visit(route('tenant-permission-role'))}>
                    Cancelar
                </Button>
            </div>
        </div>
    );
}
