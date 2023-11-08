import { motion } from 'framer-motion';
import React from 'react';
import { Swipers} from "./index";
const HomeSlider = () => {
    return ( <motion.div className=' w-full flex items-center justify-center flex-col px-3 py-3'>
<div className=' w-full flex justify-between items-center'>
    <div className=' flex flex-col justify-start items-start gap-1 '>
        <p className=' text-2xl text-headingColor font-bold'>
            Our Fresh And Healthy Food
        </p>
        <div className=' w-3/5 bg-orange-500 rounded-md h-1'></div>
    </div>
</div>
<Swipers/>
    </motion.div> );
}
 
export default HomeSlider;