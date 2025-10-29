<?php

namespace App\Http\Actions\Freight;

use App\Exceptions\HttpJsonResponseException;
use App\Models\Freight;
use Exception;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\HttpFoundation\Response;

class DeleteFreightDocumentAction
{
    private readonly Freight $freight;

    public function __construct(Freight $freight)
    {
        $this->freight = $freight;
    }

    public function execute(): void
    {
        try{
            Storage::disk('public')->delete($this->freight->document_path);
    
            $this->freight->update([
                'document_path' => null,
            ]);
        } catch (Exception $e) {
            throw new HttpJsonResponseException(
                trans('actions.document.unable.delete'),
                Response::HTTP_INTERNAL_SERVER_ERROR
            );
        }   
    }
}
