<?php

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;
use App\GuestBook;

class GuestBookSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        GuestBook::truncate();

        $faker = \Faker\Factory::create();

        for ($i = 0; $i < 100; $i++) {
            GuestBook::create([
                'name' => $faker->name,
                'email' => $faker->email,
                'text' => $faker->paragraph,
            ]);
        }
    }
}
