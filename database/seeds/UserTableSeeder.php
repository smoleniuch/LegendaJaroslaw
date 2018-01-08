<?php

use Illuminate\Database\Seeder;
use App\User;
use Illuminate\Support\Facades\Hash;

class UserTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::create([

          'password' => Hash::make('trener'),
          'email' => 'jan_13@o2.pl',
          'name' => 'Jan'

        ]);
    }
}
