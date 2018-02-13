<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
      $this->call(CalendarEventsTableSeeder::class);
      $this->call(CyclicCalendarEventTableSeeder::class);
      $this->call(PostTableSeeder::class);
      $this->call(MotivationalQuotesTableSeeder::class);
      $this->call(GalleryAlbumTableSeeder::class);
      $this->call(PhotosTableSeeder::class);
      $this->call(UserRoleTableSeeder::class);
      $this->call(UserTableSeeder::class);
      
    }
}
