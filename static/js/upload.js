/**
 * Created by pei on 2017/3/18.
 */

         //检查图片格式
        function CheckImageExtend(filename){
            var ext = "jpg,gif,png,jpe,jpeg"
            var num = filename.lastIndexOf('.');
            if(num==-1){
                return false;
            }
            else {
                if (ext.indexOf(filename.substr(num+1))>=0){
                    return true;
                }
                else {
                    return false;
                }
            }
        }
         //检查图片大小
        function CheckImageSize(image){
            var imageSize = Math.round(image.size/(1024*1024));
            if (imageSize>20){
                return false;
            }
            else {
                return true;
            }
        }
        //图片上传
        function Uploadimage(){
            // var progress = document.getElementById('progressimg');
            //     progress.innerHTML = 0+ "%";
            //     progress.style.width =0+ "%";
            var myimg = document.getElementById('image').files[0];
            function addimg() {
                var hidimg=document.createElement('input');
                    hidimg.type='hidden';
                    hidimg.name='image';
                    hidimg.value=xhr.responseText;
                var form1=document.getElementById('form');
                form1.insertBefore(hidimg,form1.childNodes[0]);
            }
            if(myimg === undefined){
                alert('请先选取图片');
            }
            else if(!CheckImageExtend(myimg.name)) {
                alert('图片格式不对');
            }
            else if(!CheckImageSize(myimg)){
                alert('大小不能超过20M');
            }
            else{
                //创建一个FormData空对象
            var fd = new FormData();
            fd.append('image',myimg);
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function(){
                if(xhr.readyState==4 && xhr.status==200){
                    // window.location='url';
                    // alert(xhr.responseText);
                    addimg();

                }
            }
            //侦查当前附件上传情况
            xhr.upload.onprogress = function(event){
                //侦查附件上传情况
                //通过事件对象侦查
                //该匿名函数表达式大概0.1秒执行一次
                var loaded = event.loaded; //已经上传大小情况
                var total = event.total;
                var percent = Math.floor(100*loaded/total);
                var progress = document.getElementById('progressimg');
                // progress.innerHTML = percent + "%";
                progress.style.width = percent + "%";
            }
            xhr.open("post","/upload_image");
            xhr.send(fd);
            }
        }

        //检查文件格式
        function CheckFileExtend(filename){
            // var ext = "jpg,gif,png,jpe,jpeg,svg,bmp,rtf,odf,ods,gnumeric,abw,doc,docx,docx,xls,xlsx,gz,bz2,zip,tar,tgz,txz,7zcsv,ini,json,plist,xml,yaml,yml"
            var ext = "csv"
            var num = filename.lastIndexOf('.');
            if(num==-1){
                return false;
            }
            else {
                if (ext.indexOf(filename.substr(num+1))>=0){
                    return true;
                }
                else {
                    return false;
                }
            }
        }
        //检查文件大小
        function CheckFileSize(file) {
            fileSize = Math.round(file.size / (1024*1024));
            if (fileSize > 20) {
                return false;
            }
            else {
                return true;
            }
        }
        //上传文件
        function Uploadfile(){
            // var progress = document.getElementById('progressfile');
            //     progress.innerHTML = 0+ "%";
            //     progress.style.width =0+ "%";
            var myfile = document.getElementById('file').files[0];
            function addfile() {
                var hidfile=document.createElement('input');
                    hidfile.type='hidden';
                    hidfile.name='file';
                    hidfile.value=xhr.responseText;
                var form1=document.getElementById('form');
                form1.insertBefore(hidfile,form1.childNodes[0]);
            }
            if(myfile === undefined){
                alert('请先选取文件');
            }
            else if(!CheckFileExtend(myfile.name)) {
                alert('文件格式不对');
            }
            else if(!CheckFileSize(myfile)){
                alert('大小不能超过20M');
            }
            else{
                //创建一个FormData空对象
            var fd = new FormData();
            fd.append('file',myfile);
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function(){
                if(xhr.readyState==4 && xhr.status==200){
                    addfile();
                }
            }
            //侦查当前附件上传情况
            xhr.upload.onprogress = function(event){
                //侦查附件上传情况
                //通过事件对象侦查
                //该匿名函数表达式大概0.1秒执行一次
                var loaded = event.loaded; //已经上传大小情况
                var total = event.total;
                var percent = Math.floor(100*loaded/total);
                var progress = document.getElementById('progressfile');
                // progress.innerHTML = percent + "%";
                progress.style.width = percent + "%";
            }
            xhr.open("post","/upload_file");
            xhr.send(fd);
            }
        }



