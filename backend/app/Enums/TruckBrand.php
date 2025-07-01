<?php

namespace App\Enums;

enum TruckBrand: string
{
    case Daf = 'DAF';
    case Iveco = 'Iveco';
    case Man = 'MAN';
    case MercedesBenz = 'Mercedes-Benz';
    case Scania = 'Scania';
    case Volkswagen = 'Volkswagen';
    case Volvo = 'Volvo';

    public static function values(): array
    {
        return array_column(self::cases(), 'value');
    }
}
