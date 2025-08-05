import { Button } from "@/shared/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/components/ui/dialog";
import { useForm } from "react-hook-form";
import { MdOutlineEdit } from "react-icons/md";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/components/ui/form";
import { Input } from "@/shared/components/ui/input";
import MoneyInput from "@/shared/components/Form/MoneyInput";

const productSchema = z.object({
  title: z.string().min(1, "O titulo é obrigatório"),
  price: z.number().min(0, "O preço deve ser maior ou igual a zero"),
  image: z.union([z.string(), z.instanceof(File)]),
});

export type ProductSchema = z.infer<typeof productSchema>;

interface EditProductButtonProps {
  defaultValues: ProductSchema;
}

function EditProductButton({ defaultValues }: EditProductButtonProps) {
  const form = useForm<ProductSchema>({
    resolver: zodResolver(productSchema),
    defaultValues,
  });

  const onSubmit = (data: ProductSchema) => {
    console.log(data);
  };

  const onCloseModal = () => {
    form.reset();
  };

  return (
    <Dialog onOpenChange={onCloseModal}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <MdOutlineEdit className="w-5 h-5 text-zinc-600" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar produto</DialogTitle>
        </DialogHeader>

        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
        >
          <Form {...form}>
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="flex flex-col justify-start">
                  <FormLabel>Título</FormLabel>
                  <FormControl>
                    <Input placeholder="Digite o título" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <MoneyInput
              form={form}
              name="price"
              placeholder="Preço da hospedagem"
            />
          </Form>

          <Button
            type="submit"
            className="h-[40px] max-h-full px-5 text-[16px] font-[400] [&_svg:not([class*='size-'])]:size-6"
          >
            Salvar alterações
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default EditProductButton;
