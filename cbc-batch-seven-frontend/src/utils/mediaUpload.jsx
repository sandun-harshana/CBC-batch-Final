import { createClient } from "@supabase/supabase-js";

const anonkey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZraHdvenR0cXZldXlrd2xpbGZzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA0NjY3NTUsImV4cCI6MjA3NjA0Mjc1NX0.E-IeubnhxZhJIpc5XBP3jlPqXgF52sk82Sq3TyLk5kM"
const supabaseUrl = "https://fkhwozttqveuykwlilfs.supabase.co"

const supabase = createClient(supabaseUrl, anonkey)


/*	supabase.storage.from("images").upload("public/"+file.name,file,{
			cacheControl:"3600",
			upsert:false,
		}).then(
			()=>{
				const publicUrl = supabase.storage.from("images").getPublicUrl(file.name).data.publicUrl
				console.log(publicUrl);
			}
		)
*/ 

export default function mediaUpload(file) {
	return new Promise((resolve, reject) => {
		if (file == null) {
			reject("No file selected");
		} else {
            const timestamp = new Date().getTime();
            const fileName = timestamp+file.name

			supabase.storage
				.from("images")
				.upload(fileName, file, {
					upsert: false,
					cacheControl: "3600",
				})
				.then(() => {
					const publicUrl = supabase.storage
						.from("images")
						.getPublicUrl(fileName).data.publicUrl;

					resolve(publicUrl);
				}).catch(
                    ()=>{
                        reject("An error occured")
                    }
                )
		}
	});
}
