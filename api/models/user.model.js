import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    username:{
        type:  String,
        required : true,
        // unique : true,
    }, 
     email:{
        type:  String,
        required : true,
         unique : true,
    },
    password:{
        type:  String,
        required : true,
    },
    avatar:{
        type:String,
        default:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKcAAACUCAMAAADBJsndAAAAMFBMVEXk5ueutLfn6eqmrrGrsbTZ3N3h4+TW2dvJzc+/w8axt7rc3+DM0NLBxsi7wMPGysy3kJZRAAADp0lEQVR4nO2b0ZajIAxAMUUUUPz/v13QTjvtONNANJGz3LMP3Xm6JxgIEJRqNBqNRqPRaDQajUajcRAASpn1X/p1TQBMP0yLtSHYeZkGf0lXgGEOrtMPOhdmfzFTUGbpdPdOtJ2MtNs3Yij1T8tNtVv8RWIKai+WT1M3XkIUhr8st+Hv5U3N8sFyZREXDRjNTgdZUY+RXEWdZDr1DusZRY2YqMdrrqJCmibDMokGGVET8jw7PUuMPKAmpFfRiV8UhluuZhTln/BNTg49CNyaBaO+BnRi9uxLLBO8mmCLwhkDyls8+YIk2mCd7YvDGeEMaOZK9B3OVQnG8nB2emDzVIRh51w90VXnPmyeAyGcXXfzTJowkzzZplCgWEa49kpQPMlvOB5N1VM9eT5QoKVR9BxYBp40y6/wlPXEdGdLeMjdvzXPkz15TsX+n3gyec6VeNYyf1ayHtWyvitVSb1UTf1ZST1fy/6omv1mLfv3as5Dyg6TNzhvPcCWe7IegJo6zj8J58nMN8eVnM9Xc99ReKTMfn9UzX1cLfeb1dwXZ5cjUvfvmaLaKbHGi0r6QxT02FyS7bdJlRPONEh3LiL7wWQlE6j+OmnJBKj5735F+ea6O3/2f85X6f9UKaTe7phqrUe2TTASgCG89Se7uZfO8j2++r1DJPV79+aKlivwNINLSiYrY4z3vt+Iv+L/09+voptMfBzvOQ63c+7+dcZfLgS7jFMafnHX+E0Os3Nbbv9I+O1Pztmpl3ubkNJmsu7228z5InzTYUwPKfgtVXomgXF8BjfGlXcKAOit+7Sq76nGuoltYwyqH+NoZ0s+wmoHhvGPy45Flpy/RzUG9VzT+FUSJe+48cQ9XbIkXsk80N10Vh0VC42c/P5o6sZTkt/jXnLk4A4/Agc1FsxDH9H22MGHE4K5ibpDj5ymcyxX08NOc8BQros+ix50zQ3Yo4Ri0UP6BshdARjTma45nm6ZRANxIYUTM+hVlDTn01tW8KKEtOfTXIe+WJNp0L9EC0eeI9NfRG2ZZ9ZrwkNEi66S4eTpfU+0oCqhPIkpJv/SGwZ+y5KFidJZQRHNrJwLr60PIOsLhfK+CiJ5OS+SRBs5zYwySbSR1UBC7eSnkDE3EfvnaOCbCTjLpB0c2lNm7vwC3USCvqw+CWR7BiyymthMIr83IHviBp697nwHl/GSk/zdE9VVwLsr2vXEbelkZ88E6iHAuadeOFAJ727i4GomEAel2Wg0MvkHmUU0Pp9NMFwAAAAASUVORK5CYII="
    },
},{timestamps:true});
const User = mongoose.model('User',userSchema);
export default User;
