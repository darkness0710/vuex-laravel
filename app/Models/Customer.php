<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Customer extends Model
{
	use HasFactory;

    protected $guarded = [];

    public function scopeWhereLike($query, $column, $value)
	{
	    return $query->where($column, 'like', '%'.$value.'%');
	}
	
	public function scopeOrWhereLike($query, $column, $value)
	{
	    return $query->orWhere($column, 'like', '%'.$value.'%');
	}
}
