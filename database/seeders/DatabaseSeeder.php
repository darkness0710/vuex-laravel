<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Customer;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        User::truncate();
        User::factory(10)->create();
        $user = User::first();
        $user->update([
            'name' => 'admin',
            'password' => \Hash::make('admin'),
            'email' => 'admin@gmail.com'
        ]);

        Customer::truncate();
        Customer::factory(100)->create();
    }
}
