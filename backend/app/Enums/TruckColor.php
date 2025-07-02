<?php

namespace App\Enums;

enum TruckColor: string
{
    case Amarela = 'Amarela';
    case Azul = 'Azul';
    case Bege = 'Bege';
    case Branca = 'Branca';
    case Cinza = 'Cinza';
    case Dourada = 'Dourada';
    case Grena = 'Grená';
    case Laranja = 'Laranja';
    case Marrom = 'Marrom';
    case Prata = 'Prata';
    case Preta = 'Preta';
    case Rosa = 'Rosa';
    case Roxa = 'Roxa';
    case Verde = 'Verde';
    case Vermelha = 'Vermelha';
    case AzulClara = 'Azul Clara';
    case AzulEscura = 'Azul Escura';
    case VerdeClara = 'Verde Clara';
    case VerdeEscura = 'Verde Escura';
    case CinzaClara = 'Cinza Clara';
    case CinzaEscura = 'Cinza Escura';
    case SemCorPredominante = 'Sem Cor Predominante';

    public static function values(): array
    {
        return array_column(self::cases(), 'value');
    }
}
