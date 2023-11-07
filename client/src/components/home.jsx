import { motion } from 'framer-motion';
import React from 'react';
import { delivery } from '../assets';
const Home = () => {
    return (<div className=' w-full flex flex-col items-start justify-center mt-5 px-2 pb-6 gap-4'>
       <motion.div className=' w-full grid grid-cols-1 md:grid-cols-2 gap-2'>
<div className=' flex flex-col items-start justify-start bg-orange-100 rounded-full gap-2 px-2'>
<p className=' text-lg font-semibold text-orange-500 w-fit'>Free Delivery</p>
<div className=' flex h-[25px] w-[25px] rounded-full bg-primary items-center justify-center'>
<img src={delivery} alt=""  className=' w-full h-full object-contain'/>
</div>
</div>
<div>2</div>
       </motion.div>
    </div>  );
}
 
export default Home;