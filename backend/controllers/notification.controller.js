import Notification from "../models/notification.model.js";

export const getNotifications = async (req, res) => {
  try {
    const userId = req.user._id;
    const notifications = await Notification.find({to: userId}).sort({createdAt: -1})
                          .populate({path:"from" ,
                                    select: "username profilePic"}); // populate the from field with username and profilePic
    
    res.status(200).json({notifications});
  } catch (error) {
    console.log("Error in getNotifications: ", error);
    res.status(500).json({error: "Internal Server Error"});
  }
};

export const deleteNotifications = async (req, res) => {
  try {
    const userId = req.user._id;

    await Notification.deleteMany({to: userId});

    res.status(200).json({message: "Notifications deleted successfully"});
    
  } catch (error) {
    console.log("Error in deleteNotifications: ", error);
    res.status(500).json({error: "Internal  Server Error"});
    
  }
};