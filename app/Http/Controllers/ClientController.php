<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\{Client, Group};

use App\Http\Resources\CredentialsGroupedResource;


class ClientController extends Controller
{

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $client = Client::create([
            'name' => $request->input('name')
        ]);

        // return Inertia::render('Clients', [
        //     'client' => $client,
        // ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $client = Client::findOrFail($id);

        $sortedCredentials = new ClientResource($client->load('credentials.group', 'credentials.fieldType'));

        return Inertia::render('Clients/Show', [
            'client' => $sortedCredentials,
        ]);
    }

        public function manageCredentials(string $id)
    {
        $client = Client::findOrFail($id);
        $groups = Group::all();
        $credentials = $client->credentials()->with(['group', 'fieldType'])->get();

        return Inertia::render('Clients/ManageCredentials', [
            'client' => $client,
            'credentials' => new CredentialsGroupedResource($credentials),
            'groups' => $groups
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
