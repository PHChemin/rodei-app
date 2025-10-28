<?php

use App\Constants\Translate;

return [
    'user' => [
        'unable' => [
            'register' => 'Não foi possível registrar o usuário.' . Translate::TRY_AGAIN,
            'update' => 'Não foi possível atualizar o usuário.' . Translate::TRY_AGAIN,
            'verify_password' => 'Houve um problema ao verificar a senha do usuário.' . Translate::TRY_AGAIN
        ]
    ],
    'fleet' => [
        'unable' => [
            'create' => 'Não foi possível criar a frota.' . Translate::TRY_AGAIN,
            'update' => 'Não foi possível atualizar a frota.' . Translate::TRY_AGAIN,
            'delete' => 'Não foi possível excluir a frota.' . Translate::TRY_AGAIN,
        ]
        ],
    'truck' => [
        'unable' => [
            'create' => 'Não foi possível criar o caminhão.' . Translate::TRY_AGAIN,
            'update' => 'Não foi possível atualizar o caminhão.' . Translate::TRY_AGAIN,
            'delete' => 'Não foi possível excluir o caminhão.' . Translate::TRY_AGAIN,
        ]
    ],
    'freight' => [
        'unable' => [
            'create' => 'Não foi possível criar o frete.' . Translate::TRY_AGAIN,
            'update' => 'Não foi possível atualizar o frete.' . Translate::TRY_AGAIN,
            'delete' => 'Não foi possível excluir o frete.' . Translate::TRY_AGAIN,
        ]
    ],
    'expense' => [
        'unable' => [
            'create' => 'Não foi possível criar a despesa.' . Translate::TRY_AGAIN,
            'update' => 'Não foi possível atualizar a despesa.' . Translate::TRY_AGAIN,
            'delete' => 'Não foi possível excluir a despesa.' . Translate::TRY_AGAIN,
        ]
    ]
];
