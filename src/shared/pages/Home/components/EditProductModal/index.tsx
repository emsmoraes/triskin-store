import React from "react";
import { Button } from "@/shared/components/ui/button";
import {
  Dialog,
  DialogContent,
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
import ImageUpload from "../ImageUpload";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Product } from "@/shared/interfaces";
import { updateProduct } from "@/shared/services";
import { ErrorMessage } from "../ErrorMessage";
import Loader from "../Loader";
import { toast } from "sonner";

const productSchema = z.object({
  title: z.string().min(1, "O titulo é obrigatório"),
  price: z.number().min(0, "O preço deve ser maior ou igual a zero"),
  image: z.union([z.string(), z.instanceof(File)]),
});

export type ProductSchema = z.infer<typeof productSchema>;

interface EditProductModalProps {
  defaultValues: ProductSchema;
  productId: number;
}

function EditProductModal({ defaultValues, productId }: EditProductModalProps) {
  const [open, setOpen] = React.useState(false); // controle do modal

  const form = useForm<ProductSchema>({
    resolver: zodResolver(productSchema),
    defaultValues,
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (product: Partial<Product>) =>
      updateProduct(productId, product),
    onSuccess: (updatedProduct) => {
      toast("Produto editado com sucesso");
      queryClient.setQueryData(
        ["products"],
        (oldData: Product[] | undefined) => {
          if (!oldData) return [];
          return oldData.map((product) =>
            product.id === productId
              ? { ...product, ...updatedProduct }
              : product
          );
        }
      );
      setOpen(false);
    },
    onError: () => {
      ErrorMessage({
        message: "Erro ao atualizar produto",
        description: "Não foi possível atualizar o produto. Tente novamente.",
      });
    },
  });

  const onSubmit = (data: ProductSchema) => {
    let imageUrl: string | undefined;

    if (typeof data.image === "string") {
      imageUrl = data.image;
    } else if (data.image instanceof File) {
      imageUrl = URL.createObjectURL(data.image);
    }

    mutation.mutate({
      title: data.title,
      price: data.price,
      image: imageUrl,
    });
  };

  const handleImageChange = (file: File | null) => {
    if (!file) return;
    form.setValue("image", file, { shouldDirty: true });
    form.trigger("image");
  };

  const isFormDirty = Object.keys(form.formState.dirtyFields).length > 0;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon">
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
          <ImageUpload
            currentImage={form.watch("image")}
            onChange={handleImageChange}
            error={form.formState.errors.image?.message}
          />

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
              label="Preço"
              form={form}
              name="price"
              placeholder="Preço do produto"
            />
          </Form>

          <Button
            type="submit"
            className="h-[40px] max-h-full px-5 text-[16px] font-[400] [&_svg:not([class*='size-'])]:size-6 mt-5"
            variant={"gradient"}
            disabled={!isFormDirty || mutation.isPending}
          >
            {mutation.isPending ? (
              <div className="flex items-center gap-2">
                <Loader className="text-white" active size={20} />
                Salvando...
              </div>
            ) : (
              "Salvar alterações"
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default EditProductModal;
