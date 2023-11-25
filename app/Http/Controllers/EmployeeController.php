<?php

namespace App\Http\Controllers;

use App\Models\Department;
use App\Models\Employee;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
// use DB;

class EmployeeController extends Controller
{

    public function index()
    {
        $employees = Employee::select(
            'employees.id',
            'employees.name',
            'email',
            'phone',
            'department_id',
            'employees.created_at',
            'employees.updated_at',
            'departments.name as department'
        )
            ->join('departments', 'departments.id', '=', 'employees.department_id')
            ->paginate(10000);

        $departments = Department::all();
        return Inertia::render('Employees/Index', [
            'employees' => $employees,
            'departments' => $departments
        ]);
    }
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|max:150',
            'email' => 'required|max:80',
            'phone' => 'required|max:15',
            'department_id' => 'required|numeric'
        ]);
        $employee = new Employee($request->input());
        $employee->save();
        return redirect('employees');
    }


    public function update(Request $request, Employee $employee)
    {
        $request->validate([
            'name' => 'required|max:150',
            'email' => 'required|max:80',
            'phone' => 'required|max:15',
            'department_id' => 'required|numeric'
        ]);
        $employee->update($request->input());
        return redirect('employees');
    }


    public function destroy(Employee $employee)
    {
        $employee->delete();
        return redirect('employees');
    }

    public function EmployeeByDepartment(Employee $employee)
    {
        $data = Employee::select(DB::raw('count(employees.id) as count'), 'department.name')
            ->join('departments', 'department.id', '=', 'employees.departments.id')
            ->groupBy('department.name')->get();
        return Inertia::render('Employees/Graphics', ['data' => $data]);
    }
    public function reports()
    {
        $employee = Employee::select('employees.id', 'employees.name', 'email', 'phone', 'department_id', 'departments.name as department')
            ->join('departments', 'department.id', '=', 'employees.departments.id')
            ->get();

        $departments = Department::all();
        return Inertia::render('Employees/Reports', [
            'employees' => $employee,
            'departments' => $departments
        ]);
    }
}
