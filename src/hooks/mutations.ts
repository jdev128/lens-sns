import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deletePost } from "../services/posts";

export const usePostDeletion = (successHandler = () => {}) => {
	const queryClient = useQueryClient();

	const deletePostMutation = useMutation({
		mutationFn: deletePost,
		onSuccess: (data) => {
			console.info(`Se elimino correctamente el post con id ${data.id}`);
			queryClient.invalidateQueries({ queryKey: ["posts"] });
            successHandler();
		},
		onError: (error, variables) => {
			console.error(
				`Ocurrio el siguiente error al intentar eliminar el post con id ${variables}:`,
				error.message
			);
		},
	});

    return deletePostMutation
};
