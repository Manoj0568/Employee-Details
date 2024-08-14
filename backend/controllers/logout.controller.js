

const logoutController = (req,res,next)=>{
    
        res.cookie('authToken', '', {
          expires: new Date(0),
          httpOnly: true,
          sameSite: 'Lax',
          secure: process.env.NODE_ENV === 'production',
        });
        res.status(200).json({ message: 'Logged out successfully' });
      
}

export default logoutController