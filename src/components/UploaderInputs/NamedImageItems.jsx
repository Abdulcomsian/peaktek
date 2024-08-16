import { Input } from "@components/FormControls";

export default function NamedImageItems({ files, register }) {
  // if(files.length > 0) return null;

  return (
    <>
      {files?.map((file, index) => (
        <div>
          <Input placeholder="Enter image name." register={register} name={`imagesName.${index}`}/>
        </div>
      ))}
    </>
  );
}
