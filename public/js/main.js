$(document).ready(() =>{
    $('.delete-todo').on('click', (e)=>{
        $target = $(e.target);
        const id = $target.attr('data-id')
        console.log(id)

        $.ajax({
            type:'DELETE',
            url: '/todo/delete/'+id,
            success: (response) => {
                alert('Deleting Todo');
                window.location.href = '/';
                console.log(response);
            },
            error: (error) => {
                console.log(error);
            }
        });
    });
});