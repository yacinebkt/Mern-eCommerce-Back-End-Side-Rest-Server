const { json } = require("body-parser");
const mongoose = require("mongoose");
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    
    },
    slug: {
      type: String,
      required: true,
      unique: true
    },
    price: {
        type:Number,
        required: true,
    },
    quantity:{
        type:Number,
        required:true,
    },
    description:{
        type:String,
        required:true,
        trim:true,
    },
    offer:{
        type:Number,
    },
    productPictures: [
       { img:{        
            type:String,
        }}
    ],
    
    
    reviews:[
        {
            userId:{type:mongoose.Schema.Types.ObjectId, ref:'User'}, 
            review:String,
            createdAt: { type: Date, default: Date.now },

            
        },
        

    ],
    ratings:[
        {
            userId:{type:mongoose.Schema.Types.ObjectId, ref:'User'}, 
            rating:Number,

        }
    ],
    createdBy:{
        type: mongoose.Schema.Types.ObjectId, ref:'User',
        required:true,

    },
    updatedAt:{
        Date
    },
    category:{
        type :mongoose.Schema.Types.ObjectId, ref:'Category',
        required:true,
    },
      
    brand:{
        type :mongoose.Schema.Types.ObjectId, ref:'Brand',
        required:true,
    },


    /*
    brandInfo:
        {
            brand: String,
            Nativename : String,
            Founded : Date,  //29 11 1997
            origin: String,    // algeria
            Headquarters: String,   // ma9ar  Oran
            ISIN : String,    //US6541061031 International Securities Identification Number
            Activity : String,  // Sports equipment

            Website : String,
           
            tradename : String, // Xiaomi = MI
            descriptionBrand : String,


            parentBrandId: String, 

            brandPictures:{
                logoBrand : {type : String}, 
               
                bannersBrand: [
                    { Bannerimg:{        
                         type:String,
                     }}
                 ]
             },


             updatedAt: { type: Date, default: Date.now },
            
        },
    */
      
    
    storage :
        {
            InternalStorage : Number,  //128 GB     
            ExpandableStorage : Number,   //256 GB    Expandable Memory //Upto 16 GB



            SupportedMemoryCardType : String,   //microSD
            MemoryCardSlotType : String,   //Dedicated Slot  Hybrid Slot



            RAM : Number,           //12 GB
            RAMType : String, //DDR4
  

            //pc 

            // pc Storage
            SSDCapacity :  Number,   //256 GB
            HDDCapacity : Number,    //HDD Capacity  1 TB  = 1.000 GB	


            // pc ram
            RAMFrequency : String, //2400 MHz 2666 MHz

            Cache : Number,  //4 MB
        }
    ,


    DisplayFeatures : [    // Screen 
        {   
            screenSize : Number, //  Display Size : 15.49 cm (6.1 inch)  // 13 inches
            ResolutionX :  Number,  //   2532             2532 x 1170 Pixels  => X/Y
            ResolutionY :  Number,  //     1170             (pixels)
            ResolutionType : String,   //Full HD   Full HD+

 
            HdRecording : Boolean,   // True False
            // pc 
            Touchscreen : Boolean,    // True False
            ScreenType : String,    //   Super AMOLED /Full HD            Display Type
            DisplayColors : Number, //16.7 M
        }
    ],
    
    OperatingSystem : [
        {
            OperatingSystem : String,  //iOS 14   Android Marshmallow 6  /window10 Dos  // Android 10

            OSArchitecture :  String,  //64 bit
            SystemArchitecture : Number, //64

            OperatingFrequency  : Number, //GSM: 850/900/1800/1900, WCDMA: B1/B2/B4/B5/B6/B8/B19, TD-LTE:


        }
    ],


    ProcessorFeatures :[
        {
            // Mobile 

            ProcessorType : String,    // HUAWEI Kirin 955 ARM A14  + Bionic Chip with Next Generation Neural Engine
            ProcessorCore : String,    //Octa Core  corei5 i3 Rayzen ..
            PrimaryClockSpeed : Number,   //2.2 GHz
            SecondaryClockSpeed : Number,  
            TertiaryClockSpeed : Number, 


            
            //GraphicsCard  pc
            DedicatedGraphicMemory : Number, // 512 MB

            //processor  pc
            ProcessorBrand : String,  //AMD
            ProcessorName : String ,   //  Ryzen 5 Quad Core
            ProcessorGeneration : String ,   //  Ryzen 5 Quad Core
            NumberofCores : Number,  // 4 cores
            ClockSpeed : Number,


        }
    ],

    
    
    camera : [

        {
            primaryCamera: String,  //64MP + 12MP + 8MP + 2MP

            
            selfiCamera: String , //64MP + 12MP

            Flash : String, //Rear: Brighter True Tone Flash with Slow Sync | Front: Retina Flash
            VideoRecording : Boolean,
            HDRecording : Boolean,
            FullHDRecording : Boolean,
            VideoRecordingResolution : String, // 4K, 1080P, HDR Video Recording with Dolby Vision Upto 30 fps
            FrameRate : String,  //24 fps, 30 fps, 60 fps, 120 fps, 240 fps
            DigitalZoom : String,  //Photo: Digital Zoom Upto 5x, Video: Digital Zoom Upto 3x

        }
    ], 



   
    Specifications : [{
        ModelName : String,
        ModelNumber : String,
        InTheBox : String,          //iPhone, USB-C to Lightning Cable, Documentation
        Color : String,        // Green
        Touchscreen : Boolean,
        SimType : Number,    // Dual Sim + Single Sim
        QuickCharging : Boolean,
        OS : String,    // Android
        OperatingSystemVersion : Number,  // 10
        UserInterface : String, //EMUI10 (Based on Android 10)


        ProcessorSpeed : Number, // 1.8 GHz

        BatteryBackup : Number, // Upto 5 hours

        SystemRequirements : String , //Windows XP
        CompatibleDevices : String, //Computer, Laptop
        
        //Tv
        Support3D : Boolean,
        SmartTV : Boolean,
        MotionSensor : Boolean,




    }],

    ConnectivityFeatures : [
        {
            MaxNetworkType : String, // 3G, 4G, 2G

            Supported4G : Boolean, 
            Supported5G : Boolean, 

            SupportedNetworks : String,  //5G, 4G LTE, WCDMA, GSM

            wifi : String,
            wifiHotspot : String,
            Bluetooth : String,   //Bluetooth Support:Yes     Bluetooth Versio : v5.0
            USBType : String,    //Yes, USB 2.0

            
            Nfc : Boolean, 
            GPS : Boolean,

            USBConnectivity : Boolean,
            MapSupport : String, // Maps Google Maps


            HDMI : Boolean,
            RadioSupport : Boolean,

            // pc
            WirelessLAN : String,   //Realtek RTL8822CE 802.11a/b/g/n/ac (2x2) Wi-Fi®
            Ethernet :  Boolean,

        }
    ],

    SmartTvFeatures : [
        {
           SupportedAppNetflix : Boolean,
           SupportedAppYoutube : Boolean,
           SupportedAppOthers : Boolean,

           AppStoreType : Boolean,
           SupportedMobileOperatingSystem : String, //Android, iOS
           SoundMode : String, //Standard, News, Movie, Game, Custom


        }
    ],


    OtherDetails : [
        {
            Smartphone : Boolean,
            BasicPhone : Boolean,
            
            Batterie : Number,
            BatteryCell : String, //3 Cell
            PowerSupply : String, // 65 W Smart AC Adapter



            RemovableBatterie : Boolean,
            GPSType : String, // Built-in GPS, GLONASS, Galileo, QZSS and BeiDou

            //pc 
            WebCamera : String,  //HP True Vision 720p HD camera
            FingerPrint  :  String,
            Keyboard : String, // English Non-backlit Keyboard //Full-size, natural silver keyboard
            InternalMic : Boolean,
            SoundProperties : String, // Stereo Speakers
            Speakers :  String, // Built-in Dual Speakers
            Type : String, //Laptop DiskTop
            Series : String, //15s
            PointerDevice : String, //Touchpad with multi-touch gesture support

            LaptopBag : Boolean,








        }
    ],

    PortsAndSlotFeatures : [
        {
            USBPort : String, //2 Super Speed USB Type-A 5Gbps signaling rate; 1 Super Speed USB Type-C®
            USBPortNumber : Number,
            RJ45 : Boolean,
            HDMIPort : Boolean,
            MicIn :  Boolean, // Yes
            MultiCardSlot : String,  //SD card reader
            HardwareInterface : String,  //M.2 SATA

        }
    ],


    Dimensions : [
        {
            Width : Number , //71.5 mm
            Height : Number , //140 mm
            Depth : Number ,  // 8.4
            Weight : Number, //170g


        }
    ],

    clothingsDetails : [
        {
            SizeAvailableN : Number,   // array 28 30 32 
            SizeAvailableD : String,   // array L M S
        } 
    ],
    industrialFeatures : [
        {
            Material : String, // Engineered Wood
            FinishType : String, //Melamine
            OriginOfProduct : String, //India



        }
    ]
  



  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);