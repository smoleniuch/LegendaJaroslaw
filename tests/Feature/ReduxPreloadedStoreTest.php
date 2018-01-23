<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;
Use Mockery as m;

class ReduxPreloadedStoreTest extends TestCase
{
    /**
     * A basic test example.
     *
     * @return void
     */
    public function testPreloadedStore()
    {
        $response = $this->get('/');

        $response->assertStatus(200);

        $response->assertViewHas('preloadedState');
    }
}
