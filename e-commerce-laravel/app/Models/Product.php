<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Product extends Model
{
    use HasFactory;
    
    protected $fillable = ['product_name', 'description', 'category_id', 'stock'];

    public function category(): BelongsTo
    {
        return $this->BelongsTo(ProductCategory::class);
    }
}
