<?php
namespace App\Http\Controllers;
use App\Models\Employer;
use Illuminate\Http\Request;


class EmployerController extends Controller
{
    public function index()
    {
        return view('employers.index');
    }

    public function getEmployers()
    {
        return response()->json(Employer::all());
    }

    public function store(Request $request)
    {
        $request->validate([
            'nome' => 'required|string|max:100',
            'email' => 'required|email|unique:usuarios,email',
            'situacao' => 'required|string|max:50',
            'data_admissao' => 'required|string',
            '_token' => 'string',
        ]);

        $employer = Employer::create($request->only(['nome', 'email', 'situacao', 'data_admissao']));


        return response()->json($employer);
    }
}
