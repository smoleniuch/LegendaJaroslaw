<?php

use Illuminate\Database\Seeder;
use App\UserRole;

class UserRoleTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
      $roles = collect(['couch', 'boxer']);

        $roles->each(function($role){

          UserRole::create(['name' => $role]);
          
        });
    }
}
