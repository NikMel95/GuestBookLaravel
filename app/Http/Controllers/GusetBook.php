<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\GuestBook;
use Validator;

class GusetBook extends Controller
{
    public function index()
    {
        return GuestBook::orderBy('created_at', 'desc')->paginate(10);
    }

    public function store(Request $request, Response $response) 
    {
       	$input = $request->all();
       	$validate_data = Validator::make($input, [
        	'name'=>'required|min:3',
        	'email'=> 'required|email',
        	'text' => 'required|min:10'
      	]);
      	if($validate_data->fails()) {
      		return response()->json([
		    	'error' => $validate_data->errors()
			], 400);
      	}
      	return response()->json([
		    'data' => GuestBook::create($input)
		], 201);
    }
}
