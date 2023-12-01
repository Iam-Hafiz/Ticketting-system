import supabase from "@/app/_lib/subapase"

export default async function DeleteTicket({params}) {
const {error} = await supabase
    .from("tickets")
    .delete()
    .eq('id', params.id)
  if(error){
      return (
        <p className="error">Could not delete the Ticket</p>
      )
  }

  return (
    <p className="text-sky-600">Ticket deleted successfully</p>
  )
}
