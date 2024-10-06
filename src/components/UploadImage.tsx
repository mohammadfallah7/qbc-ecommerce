import { useState } from "react";

interface IUploadImageProps {
  onUploadImage: (file: File) => void;
}

const UploadImage: React.FC<IUploadImageProps> = ({ onUploadImage }) => {
  const [file, setFile] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];

    onUploadImage(selectedFile!);

    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFile(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };
  return (
    <div className="flex flex-col items-center gap-7 mb-3">
      {file && (
        <figure className="w-52 h-56 overflow-hidden rounded-md">
          <img src={file} alt="Image" className="w-full h-full object-cover" />
        </figure>
      )}
      <label
        htmlFor="image"
        className="border label-text w-full text-center p-7 rounded-md border-dashed input-bordered"
      >
        آپلود عکس
      </label>
      <input
        id="image"
        type="file"
        className="file-input file-input-bordered w-full max-w-xs"
        onChange={handleFileChange}
        accept="image/jpg image/png"
        hidden
      />
    </div>
  );
};

export default UploadImage;
