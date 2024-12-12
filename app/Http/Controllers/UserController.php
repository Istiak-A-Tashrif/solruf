<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    // Fetch all users
    public function index()
    {
        return response()->json(User::all());
    }

    // Fetch a specific user by ID
    public function show($id)
    {
        $user = User::find($id);
        
        if ($user) {
            return response()->json($user);
        }

        return response()->json(['error' => 'User not found'], 404);
    }

    // Create a new user
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string',
            'email' => 'required|email|unique:users',
            'password' => 'required|string|min:8',
        ]);

        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => bcrypt($validated['password']),
        ]);

        return response()->json($user, 201);
    }

    // Update a user
    public function update(Request $request, $id)
    {
        $user = User::find($id);
        
        if (!$user) {
            return response()->json(['error' => 'User not found'], 404);
        }

        $validated = $request->validate([
            'name' => 'string',
            'email' => 'email|unique:users,email,' . $user->id,
            'password' => 'string|min:8',
        ]);

        $user->update($validated);

        return response()->json($user);
    }

    // Delete a user
    public function destroy($id)
    {
        $user = User::find($id);
        
        if (!$user) {
            return response()->json(['error' => 'User not found'], 404);
        }

        $user->delete();
        
        return response()->json(['message' => 'User deleted successfully']);
    }
}
