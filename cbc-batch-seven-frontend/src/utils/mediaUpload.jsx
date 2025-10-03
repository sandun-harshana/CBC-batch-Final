import { createClient } from "@supabase/supabase-js";

const anonKey =
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpqeXZzY2NxZHZ6bXNvb3RldnVmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTYxMjg3ODIsImV4cCI6MjA3MTcwNDc4Mn0._UROOdpCU5IlFtwVP8kNktFlXUfo3QU_YwihNh7HQZA";
const supabaseUrl = "https://jjyvsccqdvzmsootevuf.supabase.co";

const supabase = createClient(supabaseUrl, anonKey);


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
