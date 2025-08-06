import React from "react";

interface ImageUploadProps {
  currentImage?: File | string | null;
  onChange?: (file: File | null) => void;
  error?: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  currentImage,
  onChange,
  error,
}) => {
  const imageUrl =
    currentImage instanceof File
      ? URL.createObjectURL(currentImage)
      : typeof currentImage === "string"
      ? currentImage
      : null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    e.target.value = "";
    onChange?.(file);
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <label
        htmlFor="image-upload"
        className="flex flex-col items-center justify-center w-40 h-40 rounded-sm border-2 border-dashed border-gray-300 hover:border-primary cursor-pointer overflow-hidden p-1 duration-200"
      >
        {imageUrl ? (
          <img
            src={imageUrl}
            alt="Preview"
            className="w-full h-full object-contain "
          />
        ) : (
          <span className="text-sm text-gray-500">Clique para enviar</span>
        )}
        <input
          id="image-upload"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
      </label>
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default ImageUpload;
