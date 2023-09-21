<?php

namespace App\Http\Controllers;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        // Define custom validation messages (optional)
        $customMessages = [
            'email.unique' => 'The email has already been taken.',
        ];

        // Perform validation
        $validator = Validator::make($request->all(), [
            'email' => 'required|email|unique:users,email',
            'password' => 'required|min:8',
            'name' => 'required|min:3|max:50',
        ], $customMessages);

        if ($validator->fails()) {
            // Validation failed
            $errors = $validator->errors();
            $response = [
                'status' => 'validation',
                'message' => 'The provided email has been taken',
            ];
            return response()->json($response, 200);
        }

        try {
            // Create a new user
            User::create([
                'email' => $request->input('email'),
                'password' => Hash::make($request->input('password')),
                'name' => $request->input('name'),
            ]);

            // Registration successful
            return response()->json(['status' => 'success', 'message' => 'Registration successful!'], 200);
        } catch (\Exception $e) {
            // Registration failed
            return response()->json(['status' => 'failed', 'message' => 'Registration failed. Please try again.'], 400);
        }
    }

    public function login(Request $request)
    {
        $credentials = [
            'email' => $request->input('email'),
            'password' => $request->input('password')
        ];

        if (Auth::attempt($credentials)) {
            $user = Auth::user();
            $token = $user->createToken('MyApp')->plainTextToken;
            $user->api_token = $token;
            $user->save();

            $data['status'] = 'success';
            $data['message'] = 'Login successful';
            $data['token'] = $token;

            return response()->json($data);
        }

        $data['status'] = 'failed';
        $data['message'] = 'Either the email or password is not correct. Try again...';

        return response()->json($data);
    }

    public function user()
    {
        if(auth()->user()){
            return response()->json(['status' => 'success', 'user' => auth()->user()], 200);
        }

        return response()->json(['status' => 'failed', 'user' => 'User not logged in'], 400);
    }

    public function logout(Request $request)
    {
        if (Auth::check()) {
            $user = $request->user();

            // Check if the user has an api_token
            if ($user->api_token) {
                // Clear the user's api_token
                $user->api_token = null;
                $user->save();
            } else {
                return response()->json(['message' => 'User does not have a valid access token'], 400);
            }

            return response()->json(['message' => 'Logged out successfully']);
        } else {
            return response()->json(['message' => 'User is not authenticated'], 401);
        }

    }
}
