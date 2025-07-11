<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('field_type', function (Blueprint $table) {
            $table->id();
            $table->foreignId('field_id')
                ->constrained()
                ->onDelete('cascade');
            $table->foreignId('type_id')
                ->constrained()
                ->onDelete('cascade');
            $table->timestamps();

            $table->unique(['field_id', 'type_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('field_type');
    }
};
