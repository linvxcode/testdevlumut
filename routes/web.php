<?php

use App\Models\Post;
use App\Models\User;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use App\Http\Controllers\PostController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});
Route::get('/post', function($id = null) {
    $post = Post::with('user')->find($id);
    return Inertia::render('Post',[
        'user' => User::get(),
        'post' => $post,
    ]);
})->middleware(['auth', 'verified'])->name('post');
Route::get('/getpost', [PostController::class, 'index']);

Route::get('/detail', function($id) {
    $post = Post::with('user')->find($id);
    return Inertia::render('Detail', [
        'post' => $post,
    ]);
});

Route::post('/regis', [UserController::class, 'store'])->name('regis');
Route::get('/user', [UserController::class, 'index'])->name('user')->middleware('admin');
Route::delete('/userdelete/{userId}', [UserController::class, 'destroy'])->name('userdelete');
Route::put('/userupdate/{user}', [UserController::class, 'update'])->name('user.update')->middleware(['auth', 'verified']);
Route::post('/post', [PostController::class, 'store']);
Route::put('/postupdate/{postId}', [PostController::class, 'update']);
Route::delete('/postdelete/{postId}', [PostController::class, 'destroy']);

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
