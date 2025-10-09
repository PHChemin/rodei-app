<?php

namespace App\Http\Actions\Freight;

use App\Models\Freight;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class UploadFreightDocumentAction
{
    private readonly Freight $freight;
    private readonly UploadedFile $file;

    public function __construct(Freight $freight, UploadedFile $file)
    {
        $this->freight = $freight;
        $this->file = $file;
    }

    public function execute(): string   
    {
        $userName = Str::slug($this->freight->fleet->manager->name);
        $freightId = $this->freight->id;
        $timestamp = now()->format('Ymd');
        $extension = $this->file->getClientOriginalExtension();

        $filename = "{$userName}_frete_{$freightId}_{$timestamp}.{$extension}";

        // Caminho onde o arquivo será salvo (public/trucks/{truck_id}/freights)
        $path = $this->file->storeAs(
            "trucks/{$this->freight->truck_id}/freights",
            $filename,
            'public'
        );

        $this->freight->update([
            'document_path' => $path,
        ]);

        return $path;
    }
}
