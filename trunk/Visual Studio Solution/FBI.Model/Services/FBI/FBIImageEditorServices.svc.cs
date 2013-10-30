using System;
using System.Drawing;
using System.Drawing.Imaging;
using System.IO;
using System.ServiceModel.Activation;
using Tridion.ContentManager.CoreService.Client;
using Tridion.Extensions.Services.Base;
using Tridion.Extensions.FBI.Services.Interfaces;
using Tridion.Extensions.UI.FBI.Model.Services.FBI.SchemaFieldImageEditor.Data;

namespace Tridion.Extensions.Services.FBI
{

    
    /// <summary>
    /// Implementation of the Services
    /// </summary>
    /// <remarks></remarks>
    [AspNetCompatibilityRequirements(RequirementsMode = AspNetCompatibilityRequirementsMode.Required)]
    public class FBIImageEditorServices :BaseServices, IFBIImageEditorServices
    {

        public String Echo(String input)
        {
            return input;
        }


        

        public ImageEditorResult CropImage(CropImageEditorInput input)
        {
            var result = new ImageEditorResult();
            var itemUri = input.ItemURI;
            var x = (input.X);
            var y = (input.Y);
            var h = (input.Height);
            var w = (input.Width);

            try
            {

                OpenSession();

                var c = session.Read(itemUri, new ReadOptions()) as ComponentData;

                if (c!=null && c.BinaryContent != null)
                {

                    var bcd = c.BinaryContent;
                    var imageStream = GetMultimediaAsStream(itemUri);
                    using (var img = Image.FromStream(imageStream)){
                        using (var bitmap = new Bitmap(w, h))
                        {
                            bitmap.SetResolution(img.HorizontalResolution, img.VerticalResolution);

                            using (var graphic = Graphics.FromImage(bitmap))
                            {
                                graphic.InterpolationMode = System.Drawing.Drawing2D.InterpolationMode.HighQualityBicubic;
                                graphic.SmoothingMode = System.Drawing.Drawing2D.SmoothingMode.HighQuality;
                                graphic.PixelOffsetMode = System.Drawing.Drawing2D.PixelOffsetMode.HighQuality;
                                graphic.CompositingQuality = System.Drawing.Drawing2D.CompositingQuality.HighQuality;
                                graphic.DrawImage(img, 0, 0, w, h);
                                graphic.DrawImage(img, new Rectangle(0, 0, w, h), x, y, w, h, GraphicsUnit.Pixel);
                                var extension = Path.GetExtension(c.BinaryContent.Filename);
                                if (extension!=null && extension.EndsWith("gif", StringComparison.OrdinalIgnoreCase))
                                {
                                    extension = ".png";
                                }
                                
                                using (var encoderParameters = new EncoderParameters(1))
                                {
                                    encoderParameters.Param[0] = new EncoderParameter(System.Drawing.Imaging.Encoder.Quality, 100L);
                                    var targetTemporaryPath = GetUniqueUploadFileName(c.BinaryContent.Filename);
                                    bitmap.Save(targetTemporaryPath, GetImageCodec(extension), encoderParameters);
                                    c = session.CheckOut(c.Id, true, new ReadOptions()) as ComponentData;
                                    if (c != null)
                                    {
                                        c.BinaryContent.UploadFromFile = targetTemporaryPath;
                                        c = session.Save(c, new ReadOptions()) as ComponentData;
                                        c = session.CheckIn(c.Id, new ReadOptions()) as ComponentData;
                                        File.Delete(targetTemporaryPath);
                                        result = new ImageEditorResult()
                                        {
                                            ItemURI = c!=null?c.Id: string.Empty,
                                            Success = true,
                                            Message = string.Empty
                                        };
                                    }                                    
                                }
                            }
                        }
                    }
                }
            }
            catch (Exception ex)
            {

                result = new ImageEditorResult()
                {
                    ItemURI = input.ItemURI,
                    Success = false,
                    Message = ex.Message
                };

            }
            finally
            {

                CloseSession();
                CloseChannel();

            }

            return result;
        }



        

        public ImageEditorResult FilterImage(FiltersImageEditorInput input)
        {
            throw new NotImplementedException();
        }



        private string GetUniqueUploadFileName(string filename)
        {

            string uniqueFileName = Path.GetFileNameWithoutExtension(Guid.NewGuid().ToString());

            return Tridion.Web.UI.Core.Utils.GetUserUploadFileName(filename).Replace(filename, uniqueFileName);

        }







        /// <summary>

        /// Find the right codec

        /// </summary>

        /// <param name="extension"></param>

        /// <returns></returns>

        public static ImageCodecInfo GetImageCodec(string extension)
        {

            extension = extension.ToUpperInvariant();

            ImageCodecInfo[] codecs = ImageCodecInfo.GetImageEncoders();

            foreach (ImageCodecInfo codec in codecs)
            {

                if (codec.FilenameExtension.Contains(extension))
                {

                    return codec;

                }

            }

            return codecs[1];

        }
    }
}