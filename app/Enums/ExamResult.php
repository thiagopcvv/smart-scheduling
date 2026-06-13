<?php

namespace App\Enums;

enum ExamResult: string
{
    case PENDING = 'PENDING';
    case NEGATIVE = 'NEGATIVE';
    case POSITIVE = 'POSITIVE';
    case INCONCLUSIVE = 'INCONCLUSIVE';
}
