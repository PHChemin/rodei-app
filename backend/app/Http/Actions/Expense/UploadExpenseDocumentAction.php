<?php

namespace App\Http\Actions\Expense;

use App\Models\Expense;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Str;

class UploadExpenseDocumentAction
{
    private readonly Expense $expense;
    private readonly UploadedFile $file;

    public function __construct(Expense $expense, UploadedFile $file)
    {
        $this->expense = $expense;
        $this->file = $file;
    }

    public function execute(): string   
    {
        $userName = Str::slug($this->expense->freight->fleet->manager->user->name);
        $freightId = $this->expense->freight->id;
        $timestamp = now()->format('Ymd');
        $extension = $this->file->getClientOriginalExtension();

        $filename = "{$userName}_despesa_{$this->expense->id}_{$timestamp}.{$extension}";

        // Caminho onde o arquivo será salvo (public/trucks/{truck_id}/freights/{freight_id}/expenses)
        $path = $this->file->storeAs(
            "trucks/{$this->expense->freight->truck_id}/freights/{$freightId}/expenses",
            $filename,
            'public'
        );

        $this->expense->update([
            'document_path' => $path,
        ]);

        return $path;
    }
}
