<?php

namespace App\Http\Controllers;

use App\Http\Resources\User\UserLoginResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class AuthController extends Controller
{
    public function authenticate(Request $request): Response
    {
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
        ]);
    
        if (Auth::attempt($credentials)) {
            $user = Auth::user();
            $token = $user->createToken('auth_token')->plainTextToken;
    
            return response()->json([
                'status' => 'success',
                'message' => 'Login realizado com sucesso',
                'data' => [
                    'user' => new UserLoginResource($user),
                    'token' => $token
                ]
            ], Response::HTTP_OK);
        }
    
        return response()->json([
            'status' => 'error',
            'message' => 'Credenciais inválidas'
        ], Response::HTTP_UNAUTHORIZED);
    }

    public function logout(Request $request): Response
    {
        $request->user()->currentAccessToken()->delete();
    
        return response()->json([
            'status' => 'success',
            'message' => 'Logout realizado com sucesso'
        ], Response::HTTP_OK);
    }
}
