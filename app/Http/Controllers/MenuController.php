<?php
namespace App\Http\Controllers;

use App\Http\Resources\MenuResource;
use App\Models\Menu;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class MenuController extends Controller
{
    

    public function index()
    {
        return MenuResource::collection(Menu::latest()->get());
    }

    public function store(Request $request)
    {
        $request->validate([
            'name'     => 'required|string|max:255',
            'price'    => 'required|numeric',
            'category' => 'required|string|max:255',
            'image'    => 'required|image|mimes:jpeg,png,jpg',
            'status'   => 'nullable|string',
        ]);
    
        $file = $request->file('image');
        $originalName = $file->getClientOriginalName();
        $hashedName   = $file->hashName();
        $path         = $file->store('public/menus');
        $url          = Storage::url($path);
    
        $menu = Menu::create([
            'name'          => $request->name,
            'price'         => $request->price,
            'category'      => $request->category,
            'file_original' => $originalName,
            'file_hashed'   => $hashedName,
            'url'           => $url,
            'status'        => $request->status,
        ]);
    
        return new MenuResource($menu);
    }
    

    public function show(Menu $menu)
    {
        return new MenuResource($menu);
    }

    public function update(Request $request, Menu $menu)
    {

        
        $request->validate([
            'name'     => 'required|string|max:255',
            'price'    => 'required|numeric',
            'category' => 'required|string|max:255',
            'image'    => 'nullable|image|mimes:jpeg,png,jpg',
            'status'   => 'nullable|string',
        ]);

        if ($request->hasFile('image')) {
            Storage::delete('public/menus/' . $menu->file_hashed);

            $file = $request->file('image');
            $menu->file_original = $file->getClientOriginalName();
            $menu->file_hashed   = $file->hashName();
            $menu->url           = Storage::url($file->store('public/menus'));
        }

        $menu->name     = $request->name;
        $menu->price    = $request->price;
        $menu->category = $request->category;
        $menu->status   = $request->status;
        $menu->save();

        return new MenuResource($menu);
    }

    public function destroy(Menu $menu)
    {
        Storage::delete('public/menus/' . $menu->file_hashed);
        $menu->delete();

        return response()->json(['message' => 'Menu deleted successfully.']);
    }
}
