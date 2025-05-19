// src/supabase.js - COMPLETE FILE
import imageCompression from 'browser-image-compression';
import { createClient } from '@supabase/supabase-js';
import * as XLSX from 'xlsx';

// Supabase configuration (your credentials)
const supabaseUrl = 'https://pqmviixuqxqrfjphiftb.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBxbXZpaXh1cXhxcmZqcGhpZnRiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc2NzcxNzEsImV4cCI6MjA2MzI1MzE3MX0.AFvaFi2SZ-fPoj82qEDjxDJTIDC5LhWPlt_X8Y2eXoY';

// Initialize Supabase client
export const supabase = createClient(supabaseUrl, supabaseKey);

// Initial APs data with all 41 access points
export const initialAPData = [
  { id: "AP01", location: "MEN'S SECTION", status: "Not Started", verification_status: "Not Verified", assigned_to: "", old_ap_serial: "", new_ap_serial: "", notes: "", completion_time: "", image_url: null },
  { id: "AP02", location: "WOMEN'S SECTION", status: "Not Started", verification_status: "Not Verified", assigned_to: "", old_ap_serial: "", new_ap_serial: "", notes: "", completion_time: "", image_url: null },
  { id: "AP03", location: "JUNIORS", status: "Not Started", verification_status: "Not Verified", assigned_to: "", old_ap_serial: "", new_ap_serial: "", notes: "", completion_time: "", image_url: null },
  { id: "AP04", location: "ACCESSORIES", status: "Not Started", verification_status: "Not Verified", assigned_to: "", old_ap_serial: "", new_ap_serial: "", notes: "", completion_time: "", image_url: null },
  { id: "AP05", location: "BEAUTY", status: "Not Started", verification_status: "Not Verified", assigned_to: "", old_ap_serial: "", new_ap_serial: "", notes: "", completion_time: "", image_url: null },
  { id: "AP06", location: "SHOES", status: "Not Started", verification_status: "Not Verified", assigned_to: "", old_ap_serial: "", new_ap_serial: "", notes: "", completion_time: "", image_url: null },
  { id: "AP07", location: "CHILDREN'S WEAR", status: "Not Started", verification_status: "Not Verified", assigned_to: "", old_ap_serial: "", new_ap_serial: "", notes: "", completion_time: "", image_url: null },
  { id: "AP08", location: "HOME GOODS", status: "Not Started", verification_status: "Not Verified", assigned_to: "", old_ap_serial: "", new_ap_serial: "", notes: "", completion_time: "", image_url: null },
  { id: "AP09", location: "BEDDING", status: "Not Started", verification_status: "Not Verified", assigned_to: "", old_ap_serial: "", new_ap_serial: "", notes: "", completion_time: "", image_url: null },
  { id: "AP10", location: "KITCHEN", status: "Not Started", verification_status: "Not Verified", assigned_to: "", old_ap_serial: "", new_ap_serial: "", notes: "", completion_time: "", image_url: null },
  { id: "AP11", location: "LUGGAGE", status: "Not Started", verification_status: "Not Verified", assigned_to: "", old_ap_serial: "", new_ap_serial: "", notes: "", completion_time: "", image_url: null },
  { id: "AP12", location: "JEWELRY", status: "Not Started", verification_status: "Not Verified", assigned_to: "", old_ap_serial: "", new_ap_serial: "", notes: "", completion_time: "", image_url: null },
  { id: "AP13", location: "INTIMATES", status: "Not Started", verification_status: "Not Verified", assigned_to: "", old_ap_serial: "", new_ap_serial: "", notes: "", completion_time: "", image_url: null },
  { id: "AP14", location: "HOSIERY", status: "Not Started", verification_status: "Not Verified", assigned_to: "", old_ap_serial: "", new_ap_serial: "", notes: "", completion_time: "", image_url: null },
  { id: "AP15", location: "ACTIVE WEAR", status: "Not Started", verification_status: "Not Verified", assigned_to: "", old_ap_serial: "", new_ap_serial: "", notes: "", completion_time: "", image_url: null },
  { id: "AP16", location: "PLUS SIZE", status: "Not Started", verification_status: "Not Verified", assigned_to: "", old_ap_serial: "", new_ap_serial: "", notes: "", completion_time: "", image_url: null },
  { id: "AP17", location: "PETITES", status: "Not Started", verification_status: "Not Verified", assigned_to: "", old_ap_serial: "", new_ap_serial: "", notes: "", completion_time: "", image_url: null },
  { id: "AP18", location: "BOYS", status: "Not Started", verification_status: "Not Verified", assigned_to: "", old_ap_serial: "", new_ap_serial: "", notes: "", completion_time: "", image_url: null },
  { id: "AP19", location: "GIRLS", status: "Not Started", verification_status: "Not Verified", assigned_to: "", old_ap_serial: "", new_ap_serial: "", notes: "", completion_time: "", image_url: null },
  { id: "AP20", location: "INFANTS", status: "Not Started", verification_status: "Not Verified", assigned_to: "", old_ap_serial: "", new_ap_serial: "", notes: "", completion_time: "", image_url: null },
  { id: "AP21", location: "TOYS", status: "Not Started", verification_status: "Not Verified", assigned_to: "", old_ap_serial: "", new_ap_serial: "", notes: "", completion_time: "", image_url: null },
  { id: "AP22", location: "CLEARANCE", status: "Not Started", verification_status: "Not Verified", assigned_to: "", old_ap_serial: "", new_ap_serial: "", notes: "", completion_time: "", image_url: null },
  { id: "AP23", location: "CUSTOMER SERVICE", status: "Not Started", verification_status: "Not Verified", assigned_to: "", old_ap_serial: "", new_ap_serial: "", notes: "", completion_time: "", image_url: null },
  { id: "AP24", location: "CHECKOUT FRONT", status: "Not Started", verification_status: "Not Verified", assigned_to: "", old_ap_serial: "", new_ap_serial: "", notes: "", completion_time: "", image_url: null },
  { id: "AP25", location: "CHECKOUT REAR", status: "Not Started", verification_status: "Not Verified", assigned_to: "", old_ap_serial: "", new_ap_serial: "", notes: "", completion_time: "", image_url: null },
  { id: "AP26", location: "MAIN ENTRANCE", status: "Not Started", verification_status: "Not Verified", assigned_to: "", old_ap_serial: "", new_ap_serial: "", notes: "", completion_time: "", image_url: null },
  { id: "AP27", location: "SIDE ENTRANCE", status: "Not Started", verification_status: "Not Verified", assigned_to: "", old_ap_serial: "", new_ap_serial: "", notes: "", completion_time: "", image_url: null },
  { id: "AP28", location: "FITTING ROOM 1", status: "Not Started", verification_status: "Not Verified", assigned_to: "", old_ap_serial: "", new_ap_serial: "", notes: "", completion_time: "", image_url: null },
  { id: "AP29", location: "FITTING ROOM 2", status: "Not Started", verification_status: "Not Verified", assigned_to: "", old_ap_serial: "", new_ap_serial: "", notes: "", completion_time: "", image_url: null },
  { id: "AP30", location: "FITTING ROOM 3", status: "Not Started", verification_status: "Not Verified", assigned_to: "", old_ap_serial: "", new_ap_serial: "", notes: "", completion_time: "", image_url: null },
  { id: "AP31", location: "STOCKROOM MAIN", status: "Not Started", verification_status: "Not Verified", assigned_to: "", old_ap_serial: "", new_ap_serial: "", notes: "", completion_time: "", image_url: null },
  { id: "AP32", location: "STOCKROOM REAR", status: "Not Started", verification_status: "Not Verified", assigned_to: "", old_ap_serial: "", new_ap_serial: "", notes: "", completion_time: "", image_url: null },
  { id: "AP33", location: "RECEIVING", status: "Not Started", verification_status: "Not Verified", assigned_to: "", old_ap_serial: "", new_ap_serial: "", notes: "", completion_time: "", image_url: null },
  { id: "AP34", location: "EMPLOYEE BREAK ROOM", status: "Not Started", verification_status: "Not Verified", assigned_to: "", old_ap_serial: "", new_ap_serial: "", notes: "", completion_time: "", image_url: null },
  { id: "AP35", location: "MAIN OFFICE", status: "Not Started", verification_status: "Not Verified", assigned_to: "", old_ap_serial: "", new_ap_serial: "", notes: "", completion_time: "", image_url: null },
  { id: "AP36", location: "MANAGER OFFICE", status: "Not Started", verification_status: "Not Verified", assigned_to: "", old_ap_serial: "", new_ap_serial: "", notes: "", completion_time: "", image_url: null },
  { id: "AP37", location: "SERVER ROOM", status: "Not Started", verification_status: "Not Verified", assigned_to: "", old_ap_serial: "", new_ap_serial: "", notes: "", completion_time: "", image_url: null },
  { id: "AP38", location: "LOADING DOCK", status: "Not Started", verification_status: "Not Verified", assigned_to: "", old_ap_serial: "", new_ap_serial: "", notes: "", completion_time: "", image_url: null },
  { id: "AP39", location: "HALLWAY 1", status: "Not Started", verification_status: "Not Verified", assigned_to: "", old_ap_serial: "", new_ap_serial: "", notes: "", completion_time: "", image_url: null },
  { id: "AP40", location: "HALLWAY 2", status: "Not Started", verification_status: "Not Verified", assigned_to: "", old_ap_serial: "", new_ap_serial: "", notes: "", completion_time: "", image_url: null },
  { id: "AP41", location: "PARKING LOT", status: "Not Started", verification_status: "Not Verified", assigned_to: "", old_ap_serial: "", new_ap_serial: "", notes: "", completion_time: "", image_url: null }
];

// Image compression function
export const compressImage = async (file) => {
  console.log('Original image size:', (file.size / 1024 / 1024).toFixed(2), 'MB');
  
  const options = {
    maxSizeMB: 0.5,          // Max file size in MB (500KB)
    maxWidthOrHeight: 1280,  // Resize dimensions
    useWebWorker: true,      // Use web workers for better performance
    fileType: file.type      // Maintain the original file type
  };
  
  try {
    // Compress the image
    const compressedFile = await imageCompression(file, options);
    console.log('Compressed image size:', (compressedFile.size / 1024 / 1024).toFixed(2), 'MB');
    console.log('Compression ratio:', (file.size / compressedFile.size).toFixed(2) + 'x');
    
    // If the compression result is larger than the original (rare case), use the original
    if (compressedFile.size > file.size) {
      console.log('Compression increased file size, using original');
      return file;
    }
    
    return compressedFile;
  } catch (error) {
    console.error('Image compression failed:', error);
    // Fall back to original file if compression fails
    return file;
  }
};

// Initialize the database with AP data if it doesn't exist
export const initializeDatabase = async () => {
  try {
    // Check if table exists and has data
    const { data: existingAPs, error: fetchError } = await supabase
      .from('access_points')
      .select('id')
      .limit(1);
      
    if (fetchError) throw fetchError;
      
    // If no data exists, populate the table
    if (!existingAPs || existingAPs.length === 0) {
      console.log('No APs found in Supabase. Initializing with default data.');
      
      // Insert initial data
      const { error: insertError } = await supabase
        .from('access_points')
        .insert(initialAPData);
        
      if (insertError) throw insertError;
      
      console.log('Default AP data initialized successfully');
    }
    
    return true;
  } catch (error) {
    console.error('Error initializing database:', error);
    return false;
  }
};

// Fetch all APs from Supabase
export const fetchAPs = async () => {
  try {
    console.log('Fetching APs from Supabase...');
    
    const { data, error } = await supabase
      .from('access_points')
      .select('*')
      .order('id');
      
    if (error) {
      console.error('Supabase query error:', error);
      throw error;
    }
    
    console.log('Raw data from Supabase:', data);
    console.log('Number of APs retrieved:', data.length);
    
    // Make sure we're getting all records
    if (data.length < 41) {
      console.warn(`WARNING: Only retrieved ${data.length} APs out of 41 expected`);
    }
    
    // Convert snake_case from database to camelCase for frontend
    const formattedData = data.map(ap => ({
      id: ap.id,
      location: ap.location,
      status: ap.status,
      verificationStatus: ap.verification_status,
      assignedTo: ap.assigned_to,
      oldAPSerial: ap.old_ap_serial,
      newAPSerial: ap.new_ap_serial,
      notes: ap.notes,
      timestamp: ap.completion_time,
      imageUrl: ap.image_url
    }));
    
    console.log('Formatted data for frontend:', formattedData);
    return formattedData;
  } catch (error) {
    console.error('Error fetching APs:', error);
    return [];
  }
};

// Save a single AP to Supabase
export const saveAP = async (ap) => {
  try {
    // Convert camelCase to snake_case for database
    const formattedAP = {
      id: ap.id,
      location: ap.location,
      status: ap.status,
      verification_status: ap.verificationStatus,
      assigned_to: ap.assignedTo,
      old_ap_serial: ap.oldAPSerial,
      new_ap_serial: ap.newAPSerial,
      notes: ap.notes,
      completion_time: ap.timestamp,
      image_url: ap.imageUrl
    };
    
    const { error } = await supabase
      .from('access_points')
      .upsert(formattedAP, { onConflict: 'id' });
      
    if (error) throw error;
    
    console.log(`AP ${ap.id} saved successfully`);
    return true;
  } catch (error) {
    console.error('Error saving AP:', error);
    throw error;
  }
};

// Upload an image to Supabase Storage and get the download URL
export const uploadImage = async (apId, file) => {
  try {
    // Compress image before uploading
    const compressedFile = await compressImage(file);
    
    const fileExt = file.name.split('.').pop();
    const fileName = `${apId}_${Date.now()}.${fileExt}`;
    const filePath = `ap-images/${fileName}`;
    
    // Upload compressed image to Supabase Storage
    const { error: uploadError } = await supabase
      .storage
      .from('ap-images')
      .upload(filePath, compressedFile);
      
    if (uploadError) throw uploadError;
    
    // Get public URL
    const { data } = supabase
      .storage
      .from('ap-images')
      .getPublicUrl(filePath);
      
    console.log(`Image for AP ${apId} uploaded successfully`);
    return data.publicUrl;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
};

// Export AP data to Excel
export const exportToExcel = async () => {
  try {
    // Fetch all APs
    const { data, error } = await supabase
      .from('access_points')
      .select('*')
      .order('id');
      
    if (error) throw error;
    
    // Format data for export
    const exportData = data.map(ap => ({
      'AP ID': ap.id,
      'Location': ap.location,
      'Status': ap.status,
      'Verification': ap.verification_status,
      'Assigned To': ap.assigned_to,
      'Old AP Serial': ap.old_ap_serial,
      'New AP Serial': ap.new_ap_serial,
      'Notes': ap.notes,
      'Completion Time': ap.completion_time,
      'Image URL': ap.image_url
    }));
    
    // Create Excel workbook and worksheet
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(exportData);
    
    // Add worksheet to workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, 'AP Swap Data');
    
    // Generate Excel file
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    
    // Convert to Blob and create download link
    const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const url = URL.createObjectURL(blob);
    
    // Generate file name with date
    const date = new Date().toISOString().split('T')[0];
    const fileName = `AP_Swap_Report_${date}.xlsx`;
    
    // Create download link and trigger download
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    link.click();
    
    // Clean up
    URL.revokeObjectURL(url);
    
    return true;
  } catch (error) {
    console.error('Error exporting to Excel:', error);
    throw error;
  }
};

// Check if the app is online
export const isOnline = () => {
  return navigator.onLine;
};