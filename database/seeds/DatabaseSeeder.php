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
        $this->call(UserRoleTableSeeder::class);
        $this->call(UserTableSeeder::class);
        $this->call(CalendarEventsTableSeeder::class);
        $this->call(CyclicCalendarEventTableSeeder::class);
        $this->call(PostTableSeeder::class);
        $this->call(MotivationalQuotesTableSeeder::class);
        $this->call(GalleryAlbumTableSeeder::class);
        $this->call(WorkoutCycleTemplateTableSeeder::class);
        $this->call(PhotosTableSeeder::class);
        $this->call(WorkoutDaysTableSeeder::class);
        $this->call(WorkoutDayWorkoutTemplatePivotTableSeeder::class);
        $this->call(WorkoutTemplatesTableSeeder::class);
        $this->call(WorkoutWeeksTableSeeder::class);
        $this->call(WorkoutCycleTableSeeder::class);
        $this->call(WorkoutTableSeeder::class);
        $this->call(MotivationalQuoteAuthorsTableSeeder::class);
        $this->call(UserProfilesTableSeeder::class);
    }
}
