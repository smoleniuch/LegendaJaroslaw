<?php

use Illuminate\Database\Seeder;
use App\User;
use App\UserRole;
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
        $user = User::create([

          'password' => Hash::make('trener'),
          'email' => 'jan_13@o2.pl',
          'name' => 'Jan'

        ]);

        $user2 = User::create([

            'password' => Hash::make('andrewgolota'),
            'email' => 'trener@gmail.com',
            'name' => 'Andrew'
  
          ]);

        $user->roles()->attach(UserRole::where('name', 'coach')->first());
        $user2->roles()->attach(UserRole::where('name', 'coach')->first());
    }
}
