-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 29-02-2024 a las 14:23:10
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `laboratorio`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `bioanalistas`
--

CREATE TABLE `bioanalistas` (
  `id` int(11) NOT NULL,
  `cedula` int(12) NOT NULL,
  `nombre` varchar(60) NOT NULL,
  `ingreso` date NOT NULL DEFAULT current_timestamp(),
  `telefono` varchar(12) DEFAULT NULL,
  `direccion` text DEFAULT NULL,
  `colegio` varchar(15) NOT NULL,
  `pre_cedula` varchar(2) NOT NULL,
  `foto_carnet` mediumblob DEFAULT NULL,
  `foto_firma` mediumblob DEFAULT NULL,
  `status` varchar(9) NOT NULL DEFAULT 'activo'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `bioanalistas`
--

INSERT INTO `bioanalistas` (`id`, `cedula`, `nombre`, `ingreso`, `telefono`, `direccion`, `colegio`, `pre_cedula`, `foto_carnet`, `foto_firma`, `status`) VALUES
(44, 28146772, 'Bioanalista1', '2024-02-16', '04146308395', 'San francisco', '111', 'V', NULL, 0x646174613a696d6167652f706e673b6261736536342c6956424f5277304b47676f414141414e5355684555674141414f45414141446843414d414141414a62534a49414141416846424d5645582f2f2f3841414144382f507745424154352b666e31396657397662335a32646e63334e7a6d3575624d7a4d7a73374f77354f546e7036656e7938764b34754c682b666e354f546b36566c5a577071616d48683465656e70375430394e36656e717973724b586c35646358467a507a382b377537744953456a68346546776348426e5a32636a49794d784d5445374f7a745a57566c4c5330736e4a79654d6a49776147686f734c43776247787351454243382f496b35414141516d6b6c45515652346e4f3164683362694f68433135495a74634f2f67546943452f2f2b2f4e794f626c71575a78425a35783366505755497836434a706d6d5947515a677759634b4543524d6d544a677759634b4543524d6d544a677759634b4543574f424174722f3452622f4641343337496e324e514c7462727058305a747639336478516571764d6378314a64437437645a4e416b384a45624f5a47717271636857344e6b4f524e58553954794e416f6d7135775876455639417451675935562b4934397277413462724f6e76524736556e764e6f33746343545a73414c6e382f7434786634556953753847554e427465796f724d346f696431667239415452644b387a787a69347454584c394234414a303373524f6f454a485856754a644a4c7835485545466c793272333062456d396752564268676951493276496d64494131436b4a43634e37456a7a4548346963546a546579495943434763304636453455787a44594530545637453655762f3250432f425a462f30305968722b764367395976416444647a6947506d39754c6562444d647849764d6b786c32492f484d4f3355496c554873416b50634c69545139415a384d52464d6d614e37334f374234514f6e2b4651624e4247647238475334474a556a322f4b587073497355777a573830517a4d6b4c2b585741394c554354612f35346839344455626d69474e6d65437332454a6f6a58426d61452f6f4d6e574965536f45754754687a524b4f3368386c66345167644a764b446a536f34492b4e4431417733454b3233442b344668775a446977326432425a397a5547494d672b65526f6663646a454f52713168546a4d4f52347a75614d772f434c583272477878674d43633959786e774d656d42545a4c7759686d4d515a4441344d5179474e306f376d4a77594a695078477a49796a4a6b6b636d446274674a2f667a7576704f44666a7a57483634746350705a395a65714272776a796a786b4b677270686e314871777556327034493267757655517351446a484f476772426749624366473352483777476f6c4f47334a2b3052584b664470322f4e6934395755394a6d754a6a4354334635527039466962356765594f53706f306e53526b4b76593236616376676d417149427876305a3161726376595278776d624136707836625837596463416a766661322f4b48556e5a3974744e45774f586445516d655a51436566613734382b4f704d546d384375562f7a2f426e682f326a7545632f776b394478695a6d41346b6a62376c652b436c444b6f546c2b374a442f4a67687947497a395079687a39422b6770394a6d69506b4d506143793131355772756e7247375358347563336f52642b4d2b57754868415a48665048326c5776305077774e4d30777a674f334e4b704c31686448334e76484e2b7a6a44305859582b50566c36792f3572623336336c3133456f707a692b6e5747415152664d5a71717142416b4d4a72476233573558372b6f58596a64375248564d41457a4f446b574e6347563546386d5070653847586869476171354a624744447852713947796c4c433858537739424c3535767232564c69563156746d675a7479336d365655374f72624651645556522f3530544662374c686161707571347342364e7a42536e5a58334f396a313870664c75796e487542353659375a76434a6d523076565532574a4b79486b633246386330646f3933746435686e4351746a4f767337386e4874595870656c74614e6835716d615a6a66504a31547364725a68665466716a567776474674646938596345332b412f422f7436392b6f796457682f763358372f6d63684b735976546b56596266377a39346e34494c5178436c36717658797145464174674875496d3156422b6d41764e68754358457544754837446c6a686f563673514949387a414f6b71697072776a5954526e356e6a653739565a3847456145305075725645335756374a7471766e4875676955634a5a72686d486b3841304564746d2b72727a31546e77594e76697064786d57684f7a4b784e49424d4956573467614b6d692b75436b4e71476e6d3476486e59793466686a7577664d4454564a3054377366723548766777334a447150734f6a5071526e443569474f707546756d4c466c72375546643251757166756b755331536a2b6655785a796e754d7154645a5a30325456507a4a6d625875774a2b2f4850666b7778452b39747279367836515a73504c38394851414a7a627a2b647a786b7941493468567354632b4c56334630566a52635a396d323332634e692b324e4e4241714c574c58586e64425733486e52473643326b4b5872773952586968657349314b4a3675727278765a51644644715459456c4275567572534e685839734c574356333642316576583538354a3067345a5069447a2b484d374170626b36494d4f337a7266566d536c747a6c5446745730662b777045667242535165714168356d6278674f686d2f7a41666e6f6443367a5576625950322f2f4f5841737147316f593238583674764e66337638736a3839522f75373638547139634a7a796c567473446a79794a49687a773167594345316442594762674232774c5973487752614c44384d537a3762614a586a4671324d55323468475539692b7039773372302f4e5436354235385051772b54572b334163647a557a75303132583151637a514a7a73636a44454977434d466842784a5a70756b37686d316f4a342b642b365368715150345a326b4c54744c75667a37626c4132456f7a3354506a7370626b646e506b577543325a6c2b54564c335a4b5073737a49716f736747575a6c3471502b574e367a734d306a3545705268424e50304f44506e706d733144444353704c635a556665696f395538793949435950746276307a4c7373442f796d4c4c327271552f397077647a42716c41336e454f5066335a6d7065456c554a4433366d52784376493876655751372f446155422b5035645a526a79394c563241797657686444776871623458554c6355423472347753747470586c7159596c656c39656a4e366e76424c44456e57486d64472b2f376e6b614e336b48677077377651735143474173502b6452716a653844394f37614970414a6650636552656d547039633059473563656f6e64444535486f4b6e46597a4d6b6776724470737856467548426b53426a4536416b58764247316459692f4e704c566a2b486f356341555866772b5178524a4932696b3743365059542f324b7a376c344f4a66704c77394d516c4567576b2f65467379634f31584d6a563637524f562b76564f416f595333637950387441682f644c6764324d54525053736a375742306d6b7a4a555444596f326e5630484a673648637236506c444854457164355667555737367145772b4a5376396372714b7a43736178345a356d546271384b575435386174513944384e43647a394f317446346a3557635a4f6c78715a6e6f3145797a673552766e2f4e7161776c4a396c694766587161306a786573674b61767a764f5662574c30324d6b616e396f312b757847456b6d4e72362f4f357842467a664d4f4367393651712f32516748613237747a68696f572b6a786e766f75382b6e78532b72524b724e68425458334f63455a692b44393937767266533044736a53667a454e737131777547426d75566f4479317a6a392f584e7a304f703472587674734d2f5232357836517757672f31776b7434304d4f515a2f625346316a6930313664715745506135776d5437426b475062434971745452344d45557463727a41554b6a597a54796d636d412b37466f736e62457539446246496e2b58356c65734b4835532f6e6d444974577545304478635a716a6e5753624e5a58464c4a4449422b30784569364f6759534f387878416d7544724d5149356e635366597248515164657274565943526752325a382b3150383667683356642b4f4e6e554c34743550585a6352682f59332f4e465455592f736669472b2b613362787a7a6c72334c4538426c4b30416f70586538734d4c4d2b58637574384479763970616f584b4b73374943464c73586e64646b38614e7439597a506b4f2b56464b786d7041355a6e69376e4c6b71593775304a4d38387543742b4c4c53754f7263424e764a56755342645a657a445a333571775243426b3234494a516345672f795644516a5a62644a672f4d4d7a476c364642626b56724c334d72365064697a3579306f6763724579546c2b324a50593559667455434c686d397a53475939507a67586b70426f386b2b7352643252357554347955725a734d50386a5a4f36537673724c424c36562f7737732b73595237756661457146764353312b6631426330743268356f556469504a78754b51414e5a7530594b72766d384851675878555453546f7278497a63747667553173634e49674c4666342b4a3764386f5a4e58762f326946394164446478454d64716b666d316851797a794b622f39767a626e49335344743764786e38772f68436a6764647a62646d6c4e362b5671744554686134694a50636134464d71375738775a4c2b4d7362397a35734b324f50383275344b51456646327367756c4e724550577673775772594a777932493459685675643749707662354b384d5773457a764e496f4e695550726a6145425a4f456b4f6330534d3738396e4b66722b582f41384a4e4c65766356674163553374354c4764696a6e592f30575236693831537179566f3163566158354f7571736b45423951374e7268453669326e6657476b424f33454b536e2b37395a303270514b324a6b3150546469384735616e5754394f37787748544a516f742f625366482f6d7743716b61717642457641596a6d6d6e3966566757737a6672656767735a44623476704b4d397334457471653645645a4c4b466d566d4131696e78346a654a63465653775565396e7259364a4447795759316b6f473155386c356e6437524664317a736a484f2b446859326e46616e473169716c69364a3139616e327156347142764d54322b754d54755547514a77637a573870517a4f6b5a49654661466a6d5a43304c736d3630356f336b5a356b547157784e533549703679523245386b30775541724c766b6f372f587a65534273736d34304b684d7447387a6a587870536c594a4e717675674554583843734c756536414c47736452457055474b62656976396b62384a31635a6745586f79664e3367504654644d4a6d7956725645464b744a75546b41527a306c676b4936472f5732744341776234556c6f5a51754e486d7a534b6962776a436c67453443726d614c39516c6c364e6b773147643857563079556f2b724e4e7139593668696b4b5139306c6d4f396570477569565356525a36544d4e4b4c754e353774424b52774e414a43783350536a4651796247594434786f3055664447666163667a7850612b44773754554c6648583157556d4b316b75523877585a536173385263784951302f39794d7831325a72304f4e686278694577436a3551576366466942512f68536f3957446b356a2f527564796e34564d496b6b523461597445596c556d49596a704c4933734d306876744d4a52615250344f6f3948597963655978384c544a496e4a557370385276384a4a724775424e6a566d4e4d41576668746c65494c645a62314958796d4b6d77436b7a63654d424e554f35677238514755666b7756527336326255544861653053745536497152415872756d6e57613568456d3869774f44577267455736666176667347536730715a4c43766e345a467351574735584a43487a4e45704e596d307a4945584d4b74686d777361484a617576516677594243597263556c5746673237694d574e5161575770486f6262643842375a58325a414b6e496743794e706e352b326865423574454a654748627a73364c4e74565751694f5857324a556a7056516f6b2b4a2f4234436d74346765746236706f6931534334336b635a4d72434144584e324c4a694b414c4f3664734b36717374506a7967726f6848463852556945437631686452755145464761356349645a44564d4c6462594b674956516b69696c6c354d77374a2b592f41416f5a4d4a7871324158387568446f54716a30735234586b62685953592b4e3565786d6d4c6b5747456648736a357a4d7969684c53536a6154567748517459634743592f614c6f7849445130624e70682b53447153536f54635a50554370474c55694753474339396d637a3051466a3736784b305a455a7231335579583752537a4a414b32486b55614545514e44764d5a58772f686d6857643147585170534658516b614a45317450784f4b4974674c4744616a72416c4247756e4c766449555172483236744c4c7646554a5269717537365667346838364f335a385134626855596e4e473743376a42575a6c3139424867706c5a4c6e43576d64484d53676f515a7159776c59526c724535677865694834565470724e5654706b4e614c31482f4f4937476859646c4a68585348477435704b44785a2f7259374c427636504739683971794e7a4c5a646437546557554d767351464b7568556d526f74493750476e516178575a63656f6752657931666d4b61574c35666855676c734c4e6f72306f2b7144654855474e37584f34624f4f2f795131565577435946426c77584943786878316b68733053323261584d7263543072624e734e746d52325967694b5658777a6d2f514572495852685a596846624b4d526178683058303254756e62766c39455739634e5045384a54526c3766683076704f3356614b6e4a68476b64546777657769646b6a74475a4c61762b615266626e466a58786e737161542f41597245316a2f79384f2f427759463455694d4836417a6567575450396e535a645054746c446d37373739695a34485170474b5959346f355950756d377a7147453974595832716273324d3873657954446f4435556d5276326e6f4b304257587846592f5a706749536c703958617867396e6a45763745312b4a50633677437a466f3365446c4f3239423832444c693446703942676e6a54336e38743767414c466158485a4a2f345a554a672b43554f764c3766794777734b486d4d732b7938314e4e596f3168715a62383451732f6c417a6d533975774b422b32584c47786251656d2b477a4e6b50424f326c412f694937382b735051637752554872737a3937543857536a4e372f346757414e634b302f697447535970693569386766476b71734167442b2f6a3943594457767471663976466c385a764c30514d774a742b2f6b6267706b73323747747a66774e5a62316173504e57325453393761586a73445a586d68367a377a4962576c634c7a54394a34465a5a4f4979586f397273464374726533313837424774676b374a442b76725058506d3139457248546f6e3845564e417872586d547348534b652b755678546c4b46724978336a4a4765674d5966327154384f7643653743375a6f78667a595476333248496f423279747a2b5559324f7a4c6e37524c5631354670647441394e334f744a2b467368676c6877366c6c55667471556f755853594a6e434e633963356c443056326c2b62506352427773795359327449574974524733656a732b43556e753972647a4f462f774c3071447a39797279343164336a4c334f736f7934762f302b6a4c63347a6457586c72632b7238665a3279434a786638525375776436696b684a656c666d56435a4c6d546d5466334544506b4475325336665068646a346638335a2f2b4176755542396f514a45795a4d6d444268776f514a45795a4d6d444268776f514a45796238332f45666f3748746863566465785541414141415355564f524b35435949493d, 'activo');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detalles_examen`
--

CREATE TABLE `detalles_examen` (
  `id` int(11) NOT NULL,
  `id_ex` int(11) NOT NULL,
  `nombre` tinytext NOT NULL,
  `posicion` int(11) NOT NULL DEFAULT 0,
  `unidad` varchar(30) DEFAULT NULL,
  `impsiempre` tinyint(1) NOT NULL,
  `resultados` text DEFAULT NULL,
  `status` varchar(9) NOT NULL DEFAULT 'activo'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `detalles_examen`
--

INSERT INTO `detalles_examen` (`id`, `id_ex`, `nombre`, `posicion`, `unidad`, `impsiempre`, `resultados`, `status`) VALUES
(1, 3, 'TRANSAMINASA  P (PIRUVICA) HOMBRES ', 0, 'U/L ', 0, '', 'activo'),
(2, 5, 'PERFIL LIPIDICO ', 0, ' ', 0, '', 'activo'),
(3, 7, 'UROCULTIVO ', 0, ' ', 0, '', 'activo'),
(4, 7, 'HERMOCULTIVO ', 0, ' ', 0, '', 'activo'),
(5, 7, 'COPROCULTIVO ', 0, ' ', 0, '', 'activo'),
(6, 7, 'BK (DIRECTO CULTIVO) ', 0, ' ', 0, '', 'activo'),
(7, 7, 'ANTIBIOTICOGRAMA ', 0, ' ', 0, '', 'activo'),
(8, 7, 'DIRECTO (GRAM) ', 0, ' ', 0, '', 'activo'),
(9, 7, 'EN FRESCO ', 0, ' ', 0, '', 'activo'),
(10, 7, 'INV. DE CLAMYDIAS ', 0, ' ', 0, '', 'activo'),
(11, 3, 'GAMMA GLUTAMIL TRANSPEPTIDASA  (GGTP) HOMBRES ', 0, 'U/L ', 0, '', 'activo'),
(12, 3, 'GAMMA GLUTAMIL TRANSPEPTIDASA  (GGTP)  MUJERES ', 0, 'U/L ', 0, '', 'activo'),
(13, 8, 'REACCION DE BRUCELLA ABORTUS ', 0, ' ', 0, '', 'activo'),
(14, 9, 'LIPIDOGRAMA ', 0, ' ', 0, '', 'activo'),
(15, 9, 'COLESTEROL TOTAL ', 0, 'MG/DL ', 0, '', 'activo'),
(16, 9, 'HDL COLESTEROL ', 0, 'MG/DL ', 0, '', 'activo'),
(17, 9, 'VLDL COLESTEROL ', 0, 'MG/DL ', 0, '', 'activo'),
(18, 9, 'RELACION COL TOT/HDL COL HOMBRE ', 0, 'MG/DL ', 0, '', 'activo'),
(19, 9, 'RELACION COL TOT/HDL COL MUJERES ', 0, 'MG/DL ', 0, '', 'activo'),
(20, 9, 'FACTOR DE RIESGO ', 0, '% ', 0, '', 'activo'),
(21, 10, 'GLUCOSA EN AYUNAS ', 0, 'MG/DL ', 0, '', 'activo'),
(22, 10, 'GLUCOSA 30 MINUTOS ', 0, 'MG/DL ', 0, '', 'activo'),
(23, 10, 'GLUCOSA 60 MINUTOS ', 0, 'MG/DL ', 0, '', 'activo'),
(24, 10, 'GLUCOSA 120 MINUTOS ', 0, 'MG/DL ', 0, '', 'activo'),
(25, 11, 'GLUCOSA EN AYUNAS ', 0, 'MG/DL ', 0, '', 'activo'),
(26, 11, 'GLUCOSA 30 MINUTOS ', 0, 'MG/DL ', 0, '', 'activo'),
(27, 11, 'GLUCOSA 60 MINUTOS ', 0, 'MG/DL ', 0, '', 'activo'),
(28, 11, 'GLUCOSA 120 MINUTOS ', 0, 'MG/DL ', 0, '', 'activo'),
(29, 12, 'HIERRO SERICO ', 0, 'NG/DL ', 0, '', 'activo'),
(30, 12, 'WIBC ', 0, 'NG/DL ', 0, '', 'activo'),
(31, 12, 'TIBC ', 0, 'NG/DL ', 0, '', 'activo'),
(32, 12, 'SATURACION ', 0, '% ', 0, '', 'activo'),
(33, 15, 'PH ', 0, 'MML/DG ', 0, '', 'activo'),
(34, 15, 'PCO2 ', 0, 'MML/DG ', 0, '', 'activo'),
(35, 15, 'PO2 ', 0, 'MML/DG ', 0, '', 'activo'),
(36, 15, 'HCO3 ', 0, 'MML/DG ', 0, '', 'activo'),
(37, 15, 'TCO2 ', 0, 'MML/DL ', 0, '', 'activo'),
(38, 15, 'B.E. ', 0, 'MML/L ', 0, '', 'activo'),
(39, 15, 'SAT ', 0, '% ', 0, '', 'activo'),
(40, 16, 'ASPECTO: ', 0, ' ', 0, 'Resultado # 1~Resultado # 2', 'activo'),
(41, 16, 'COLOR ', 0, ' ', 0, '', 'activo'),
(42, 16, 'DENSIDAD: ', 0, ' ', 0, '', 'activo'),
(43, 17, 'CONTAJE DE CELULAS AD ', 0, 'MM3 ', 0, '', 'activo'),
(44, 17, 'RECUENTO DIFERENCIAL N: ', 0, 'MM3 ', 0, '', 'activo'),
(45, 18, 'GLUCOSA ', 0, ' ', 0, '', 'activo'),
(46, 18, 'PROTEINAS (LUMBAR) ', 0, ' ', 0, '', 'activo'),
(47, 18, 'PANDY (LISTOMAL) ', 0, ' ', 0, '', 'activo'),
(48, 18, 'PANDY (VENTRICULAR) ', 0, ' ', 0, '', 'activo'),
(49, 19, 'COLOR ', 0, ' ', 0, '', 'activo'),
(50, 19, 'ASPECTO ', 0, ' ', 0, '', 'activo'),
(51, 19, 'VISCOSIDAD ', 0, ' ', 0, '', 'activo'),
(52, 19, 'DENSIDAD ', 0, ' ', 0, '', 'activo'),
(53, 19, 'PH ', 0, ' ', 0, '', 'activo'),
(54, 19, 'COAGULO DE FIBRINA ', 0, ' ', 0, '', 'activo'),
(55, 19, 'TEST DE MUCINA ', 0, ' ', 0, '', 'activo'),
(56, 20, 'CONTAJE DE CELULAS ', 0, ' ', 0, '', 'activo'),
(57, 20, 'RECUENTO DIFERENCIAL ', 0, ' ', 0, '', 'activo'),
(58, 21, 'PROTEINAS ', 0, ' ', 0, '', 'activo'),
(59, 21, 'GLUCOSA ', 0, ' ', 0, '', 'activo'),
(60, 21, 'ACIDO URICO ', 0, ' ', 0, '', 'activo'),
(61, 21, 'COLESTEROL ', 0, ' ', 0, '', 'activo'),
(62, 22, 'ASPECTO ', 0, ' ', 0, '', 'activo'),
(63, 22, 'COLOR ', 0, ' ', 0, '', 'activo'),
(64, 22, 'PH ', 0, ' ', 0, '', 'activo'),
(65, 22, 'DENSIDAD ', 0, ' ', 0, '', 'activo'),
(66, 22, 'FORMACION DE COAGULO ', 0, ' ', 0, '', 'activo'),
(67, 23, 'CONTAJE CELULAR ', 0, ' ', 0, '', 'activo'),
(68, 23, 'RECUENTO DIFERENCIAL ', 0, ' ', 0, '', 'activo'),
(69, 24, 'REACCION DE RIVALTA ', 0, ' ', 0, '', 'activo'),
(70, 24, 'PROTEINAS ', 0, ' ', 0, '', 'activo'),
(71, 24, 'GLUCOSA ', 0, ' ', 0, '', 'activo'),
(72, 24, 'ENZIMAS LDH ', 0, ' ', 0, '', 'activo'),
(73, 24, 'COLESTEROL ', 0, ' ', 0, '', 'activo'),
(74, 25, 'VOLUMEN ', 0, ' ', 0, '', 'activo'),
(75, 25, 'COLOR ', 0, ' ', 0, '', 'activo'),
(76, 25, 'ASPECTO ', 0, ' ', 0, '', 'activo'),
(77, 25, 'DENSIDAD ', 0, ' ', 0, '', 'activo'),
(78, 25, 'PH ', 0, ' ', 0, '', 'activo'),
(79, 25, 'PRESENCIA DE COAGULOS ', 0, ' ', 0, '', 'activo'),
(80, 26, 'RECUENTO CELULAR ', 0, ' ', 0, '', 'activo'),
(81, 26, 'RECUENTO DIFERENCIAL ', 0, ' ', 0, '', 'activo'),
(82, 27, 'RIVALTA ', 0, ' ', 0, '', 'activo'),
(83, 27, 'PROTEINAS ', 0, ' ', 0, '', 'activo'),
(84, 27, 'GLUCOSA ', 0, ' ', 0, '', 'activo'),
(85, 28, 'ASPECTO ', 0, ' ', 0, '', 'activo'),
(86, 28, 'COLOR ', 0, ' ', 0, '', 'activo'),
(87, 28, 'REACCION ', 0, ' ', 0, '', 'activo'),
(88, 28, 'DENSIDAD ', 0, ' ', 0, 'Positivo~Negativo~Que mas\r\nasi', 'activo'),
(89, 28, 'PRESENCIA DE COAGULOS ', 0, ' ', 0, '', 'activo'),
(90, 29, 'CONTAJE CELULAR ', 0, ' ', 0, '', 'activo'),
(91, 29, 'RECUENTO DIFERENCIAL ', 0, ' ', 0, '', 'activo'),
(92, 30, 'RIVALTA ', 0, ' ', 0, '', 'activo'),
(93, 30, 'PROTEINAS ', 0, ' ', 0, '', 'activo'),
(94, 30, 'ENZIMAS ', 0, ' ', 0, '', 'activo'),
(95, 30, 'GLUCOSA ', 0, ' ', 0, '', 'activo'),
(96, 35, 'PRUEBA DE EMBARAZO EN ORINA ', 0, ' ', 0, '', 'activo'),
(97, 36, 'VOLUMEN TOTAL ', 0, ' ', 0, '', 'activo'),
(98, 36, 'PROTEINAS CUALITATIVAS ', 0, ' ', 0, '', 'activo'),
(99, 36, 'PROTEINAS CUANTITATIVAS ', 0, 'MG/24H ', 0, '', 'activo'),
(100, 37, 'VOLUMEN TOTAL ', 0, ' ', 0, '', 'activo'),
(101, 37, 'CALCIO EN ORINA DE 24 HORAS ', 0, 'GR/24H ', 0, '', 'activo'),
(102, 38, 'VOLUMEN TOTAL ', 0, ' ', 0, '', 'activo'),
(103, 38, 'FOSFORO EN ORINA DE 24 HORAS ', 0, 'ML/24H ', 0, '', 'activo'),
(104, 39, 'ACIDO URICO EN ORINA DE 24 HORAS ', 0, '9MG/24H ', 0, 'Dolor nivel I~Dolor Nivel II~Dolor Nivel III~Dolor Nivel VI~Dolor Nivel V~Dolor Nivel VI~Dolor Nivel VII~Dolor Nivel VIII~Dolor Nivel IX~Dolor Nivel X', 'activo'),
(105, 40, 'VOLUMEN TOTAL ', 0, ' ', 0, '', 'activo'),
(106, 40, 'UREA EN ORINA DE 24 HORAS ', 0, 'GR/24H ', 0, '', 'activo'),
(107, 41, 'VOLUMEN TOTAL ', 0, ' ', 0, '', 'activo'),
(108, 41, 'SODIO EN ORINA DE 24 HORAS ', 0, 'MEG/24H ', 0, '', 'activo'),
(109, 42, 'VOLUMEN TOTAL ', 0, ' ', 0, '', 'activo'),
(110, 42, 'POTASIO EN ORINA DE 24 HORAS ', 0, 'MEG/24 ', 0, '', 'activo'),
(111, 43, 'VOLUMEN TOTAL ', 0, ' ', 0, '', 'activo'),
(112, 43, 'CLORO EN ORINA DE 24 HORAS  NIÑOS ', 0, 'MEG/24H ', 0, '', 'activo'),
(113, 43, 'CLORO EN ORINA DE 24 HORAS  ADULTOS ', 0, 'MEG/24H ', 0, '', 'activo'),
(114, 44, 'VOLUMEN TOTAL ', 0, ' ', 0, '', 'activo'),
(115, 44, 'AMILASA ', 0, 'U/HORA ', 0, '', 'activo'),
(116, 46, 'CELULAS ', 0, ' ', 0, '', 'activo'),
(117, 46, 'HEMATIES ', 0, ' ', 0, '', 'activo'),
(118, 46, 'LEUCOCITOS ', 0, ' ', 0, '', 'activo'),
(119, 46, 'CILINDROS ', 0, ' ', 0, '', 'activo'),
(120, 46, 'VOLUMEN TOTAL ', 0, ' ', 0, '', 'activo'),
(121, 48, 'KATO ', 0, ' ', 0, '', 'activo'),
(122, 48, 'AZUCARES REDUCTORES ', 0, ' ', 0, '', 'activo'),
(123, 48, 'SUDAN III ', 0, ' ', 0, '', 'activo'),
(124, 48, 'SANGRE OCULTA ', 0, ' ', 0, '', 'activo'),
(125, 8, 'SALMONELLA THYPOID H= ', 0, ' ', 0, '', 'activo'),
(126, 8, 'REACCION DE WIDAL SALMONELLA THYPOID 0= ', 0, ' ', 0, '', 'activo'),
(127, 8, 'SALMONELLA PARA THYPOID B= ', 0, ' ', 0, '', 'activo'),
(128, 8, 'SALMONELLA PARA THYPOID A= ', 0, ' ', 0, '', 'activo'),
(129, 39, 'VOLUMEN TOTAL2', 0, '', 0, '', 'activo'),
(130, 9, 'LDL COLESTEROL                                                                  ', 0, 'mg/dl               ', 0, '~', 'activo'),
(131, 9, 'TRIGLICERIDOS                                                                   ', 0, 'mg/dl               ', 0, '~', 'activo'),
(132, 13, 'GLUCOSA EN AYUNAS                                                               ', 0, 'mg/dl               ', 0, '~', 'activo'),
(133, 13, 'GLUCOSA SEGUNDA HORA                                                            ', 0, 'mg/dl               ', 0, '~', 'activo'),
(134, 34, 'CREATININA EN SANGRE                                                            ', 0, 'mg/dl               ', 0, '~', 'activo'),
(135, 34, 'DEPURACION                                                                      ', 0, 'ml/24H              ', 0, '~', 'activo'),
(136, 34, 'VOLUMEN MINUTO                                                                  ', 0, 'ml/Min              ', 0, '~', 'activo'),
(137, 34, 'VOLUMEN TOTAL                                                                   ', 0, 'ml                  ', 0, '~', 'activo'),
(138, 58, 'UREA                                                                            ', 0, 'mg/dl               ', 0, '~', 'activo'),
(139, 57, 'CREATININA                                                                      ', 0, 'mg/dl               ', 0, '~', 'activo'),
(140, 55, 'CALCIO SERICO                                                                   ', 0, 'mg/dl               ', 0, '~', 'activo'),
(141, 54, 'LDH                                                                             ', 0, 'U/I                 ', 0, '~', 'activo'),
(142, 51, 'BILIRRUBINA TOTAL                                                               ', 0, 'mg/dl               ', 0, '~', 'activo'),
(143, 52, 'BILIRRUBINA DIRECTA                                                             ', 0, 'mg/dl               ', 0, '~', 'activo'),
(144, 53, 'BILIRRUBINA INDIRECTA                                                           ', 0, 'mg/dl               ', 0, '~', 'activo'),
(145, 47, 'ASPECTO                                                                         ', 1, '                    ', 0, 'HOMOGENEO~HETEROGENEO~', 'activo'),
(146, 47, 'COLOR                                                                           ', 2, '                    ', 0, 'AMARILLA~MARRON~VERDOSA~', 'activo'),
(147, 47, 'REACCION                                                                        ', 5, '                    ', 0, 'ACIDA~ALCALINA~', 'activo'),
(148, 47, 'MOCO                                                                            ', 6, '                    ', 0, 'PRESENTE~NO~', 'activo'),
(149, 47, 'SANGRE                                                                          ', 7, '                    ', 0, 'PRESENTE~NO~', 'activo'),
(150, 47, 'EXAMEN MICROSCOPICO                                                             ', 9, '                    ', 0, 'HELMINTOS~PROTROZOARIOS~NO SE OBSERVARON FORMAS EVOLUTIVAS PARASITARIAS EN LA MUESTRA ANALIZADA~', 'activo'),
(151, 49, 'TGO                                                                             ', 0, 'U/L                 ', 0, '~', 'activo'),
(152, 50, 'TGP                                                                             ', 0, 'U/L                 ', 0, '~', 'activo'),
(153, 31, 'ASPECTO                                                                         ', 2, '                    ', 0, 'LIG TURBIO~TURBIO~TRANSPARENTE~', 'activo'),
(154, 31, 'OLOR                                                                            ', 4, '                    ', 0, 'SUI GENERI~FETIDA~', 'activo'),
(155, 32, 'PROTEINAS                                                                       ', 2, '                    ', 0, 'NEGATIVA~TRAZAS~POSITIVA +~POSITIVA ++~POSITIVA +++~', 'activo'),
(156, 32, 'GLUCOSA                                                                         ', 1, '                    ', 0, 'TRAZAS~NEGATIVA~POSITIVA +~POSITIVA ++~POSITIVA +++~', 'activo'),
(157, 32, 'BILIRRUBINA                                                                     ', 3, '                    ', 0, 'NEGATIVA~POSITIVA (+)~POSITIVA (++)~POSITIVA (+++)~', 'activo'),
(158, 32, 'UROBILINOGENO                                                                   ', 4, '                    ', 0, 'NORMAL~2 mg/dl~4 mg/dl~8 mg/dl~12 mg/dl~', 'activo'),
(159, 32, 'CETONA                                                                          ', 5, '                    ', 0, 'NEGATIVA~TRAZAS~POSITIVA (+)~POSITIVA (++)~POSITIVA (+++)~', 'activo'),
(160, 32, 'NITRITOS                                                                        ', 6, '                    ', 0, 'NEGATIVO~TRAZAS~POSITIVO +~POSITIVO ++~POSITIVO +++~', 'activo'),
(161, 32, 'SANGRE                                                                          ', 7, '                    ', 0, 'NEGATIVA~TRAZAS~POSITIVA (+)~POSITIVA (++)~POSITIVA (+++)~', 'activo'),
(162, 47, 'OLOR', 4, '', 0, 'FECAL~FETIDO', 'activo'),
(163, 31, 'REACCION O PH', 6, '', 0, 'ACIDA (5)~ACIDA (6)~ACIDA (6,5)~NEUTRA (7)~ALCALINA (8)~ALCALINA (9)', 'activo'),
(164, 31, 'DENSIDAD', 5, '', 0, '1000~1005~1010~1015~1.020\r\n~1025~1030', 'activo'),
(165, 32, 'LEUCOCITOS', 8, '', 0, 'NEGATIVO~TRAZAS~POSITIVO (+)~POSITIVO (++)~POSITIVO (+++)', 'activo'),
(166, 6, 'CALCIO', 1, 'mg/dl', 0, '', 'activo'),
(167, 6, 'POTASIO', 2, 'mEq/L', 0, '', 'activo'),
(168, 6, 'SODIO', 3, 'mEq/L', 0, '', 'activo'),
(169, 6, 'MAGNESIO', 4, 'mg/dl', 0, '', 'activo'),
(170, 6, 'FOSFORO ADULTO', 6, 'mg/dl', 0, '', 'activo'),
(171, 6, 'FOSFORO NIÑOS', 7, 'mg/dl', 0, '', 'activo'),
(172, 6, 'CLORO', 8, 'mEq/L', 0, '', 'activo'),
(173, 8, 'VDRL (Cuantitativo)', 3, '', 0, '', 'activo'),
(174, 8, 'CELULA LE', 0, '', 0, '', 'activo'),
(175, 56, 'ACIDO URICO', 6, 'mg/dl', 0, '', 'activo'),
(176, 31, 'CANTIDAD', 1, 'ml', 0, '10 ml~20 ml~30 ml~40 ml~50 ml~60 ml~70 ml~80 ml~90 ml~100 ml', 'activo'),
(177, 47, 'ALMIDON INDIGERIDO', 12, '', 0, 'AUSENTE~PRESENTE~ABUNDANTE', 'activo'),
(178, 47, 'RESTOS ALIMENTICIOS', 8, '', 0, 'PRESENTE~NO~AUSENTE', 'activo'),
(179, 47, 'LEUCOCITOS', 14, '', 0, 'ESCASOS~MODERADOS~ABUNDANTES~NO~PRESENTES~AUSENTES', 'activo'),
(180, 47, 'HEMATIES', 15, '', 0, 'ESCASOS~MODERADOS~ABUNDANTES~NO~PRESENTES~AUSENTES', 'activo'),
(181, 47, 'CONSISTENCIA', 3, '', 0, 'FORMADA~PASTOSA~BLANDA~DIARREICA~LIQUIDA~DURA', 'activo'),
(182, 47, 'GLOBULOS DE GRASA', 13, '', 0, 'NO~PRESENTES~AUSENTES', 'activo'),
(183, 47, 'LEVADURAS', 11, '', 0, 'PRSENTES~AUSENTES~ESCASAS~MODERADAS~ABUNDANTES', 'activo'),
(184, 8, 'V.D.R.L. (Cualitativo)', 2, '', 0, 'NO REACTIVO~REACTIVO', 'activo'),
(185, 8, 'MONOTEST', 6, '', 0, 'NEGATIVA~POSITIVO', 'activo'),
(186, 8, 'ANTIESTREPTOLISINA \"O\"', 8, '', 0, 'NEGATIVO~POSITIVO', 'activo'),
(187, 5, 'COLESTEROL TOTAL', 1, 'mg/dl', 0, '', 'activo'),
(188, 5, 'TRIGLICERIDOS', 2, 'mg/dl', 0, '', 'activo'),
(189, 5, 'H.D.L. COLESTEROL', 3, 'mg/dl', 0, '', 'activo'),
(190, 5, 'L.D.L. COLESTEROL', 5, 'mg/dl', 0, '', 'activo'),
(191, 2, 'GLICEMIA BASAL', 1, 'mg/dl', 0, '', 'activo'),
(192, 2, 'UREA', 3, 'mg/dl', 0, '', 'activo'),
(193, 2, 'CREATININA SERICA', 4, 'mg/dl', 0, '', 'activo'),
(194, 2, 'TRIGLICERIDOS', 6, 'mg/dl', 0, '', 'activo'),
(195, 2, 'ACIDO URICO', 7, 'mg/dl', 0, '', 'activo'),
(196, 2, 'TGO', 8, 'U/L', 0, '', 'activo'),
(197, 2, 'TGP', 9, 'U/L', 0, '', 'activo'),
(198, 2, 'BILIRRUBINA TOTAL', 10, 'mg/dl', 0, '', 'activo'),
(199, 2, 'BILIRRUBINA DIRECTA', 11, 'mg/dl', 0, '', 'activo'),
(200, 2, 'BILIRRUBINA INDIRECTA', 12, 'mg/dl', 0, '', 'activo'),
(201, 2, 'PROTEINAS TOTALES', 13, 'g/dl', 0, '', 'activo'),
(202, 2, 'ALBUMINA', 14, 'g/dl', 0, '', 'activo'),
(203, 2, 'GLOBULINA', 15, 'g/dl', 0, '', 'activo'),
(204, 2, 'GGT', 17, 'U/l', 0, '', 'activo'),
(205, 2, 'LDH', 16, 'U/l', 0, '', 'activo'),
(206, 2, 'FOSF. ALCALINA', 18, 'U/l', 0, '', 'activo'),
(207, 2, 'FOSFORO', 19, 'mg/dl', 0, '', 'activo'),
(208, 2, 'CALCIO', 21, 'mg/dl', 0, '', 'activo'),
(209, 2, 'AMILASA', 22, 'U/L', 0, '', 'activo'),
(210, 2, 'COLESTEROL', 5, 'mg/dl', 0, '', 'activo'),
(211, 2, 'TROPONINA I', 23, 'ng/mL', 0, '', 'activo'),
(212, 14, 'LH FASE FOLICULAR', 0, 'mUl/ml', 0, '', 'activo'),
(213, 14, 'LH FASE OVULATORIA', 0, 'mUl/ml', 0, '', 'activo'),
(214, 14, 'LH HOMBRE', 0, 'mUl/ml', 0, '', 'activo'),
(215, 14, 'LH POSTMENOPAUSICA', 0, 'mUl/ml', 0, '', 'activo'),
(216, 14, 'FSH FASE FOLICULAR', 0, 'mlU/mL', 0, '', 'activo'),
(217, 14, 'FSH CICLO MEDIO', 0, 'mlU/mL', 0, '', 'activo'),
(218, 14, 'FSH HOMBRE', 0, 'mlU/mL', 0, '', 'activo'),
(219, 14, 'FSH FASE LUTEA', 0, 'mlU/mL', 0, '', 'activo'),
(220, 14, 'FSH POSTMENOPAUSICA', 0, 'mlU/mL', 0, '', 'activo'),
(221, 14, 'LH FASE LUTEAL', 0, 'mUl/ml', 0, '', 'activo'),
(222, 14, 'PROGESTERONA EMBARAZADA 2DO TRIMESTRE', 0, 'ng/ml', 0, '', 'activo'),
(223, 14, 'PROGESTERONA FASE FOLICULAR', 0, 'ng/ml', 0, '', 'activo'),
(224, 14, 'PROGESTERONA FASE LUTEA MEDIA', 0, 'ng/ml', 0, '', 'activo'),
(225, 14, 'PROGESTERONA MASCULINO', 0, 'ng/ml', 0, '', 'activo'),
(226, 14, 'PROGESTERONA POSMENOPAUSICA', 0, 'ng/ml', 0, '', 'activo'),
(227, 14, 'PROLACTINA HOMBRE', 0, 'ng/mL', 0, '', 'activo'),
(228, 14, 'PROLACTINA  CICLO MESTRUAL', 0, 'ng/mL', 0, '', 'activo'),
(229, 14, 'PROLACTINA FASE MENOPAUSICA', 0, 'ng/mL', 0, '', 'activo'),
(230, 14, 'PSA TOTAL', 0, 'ng/mL', 0, '', 'activo'),
(231, 14, 'FERRITINA MUJER', 0, 'ng/mL', 0, '', 'activo'),
(232, 14, 'TROPONINA I', 0, 'ng/mL', 0, '', 'activo'),
(233, 14, 'TSH', 0, 'uUl/Ml', 0, '', 'activo'),
(234, 14, 'PROGESTERONA EMBARAZADA 1ER TRIMESTRE', 0, 'ng/ml', 0, '', 'activo'),
(235, 14, 'HEPATITIS C', 0, 'COI', 0, '', 'activo'),
(236, 14, 'T3 TOTAL ADULTO', 0, 'ng/ml', 0, '', 'activo'),
(237, 14, 'T3 TOTAL NIÑO DE 1 - 10 AÑOS', 0, 'ng/ml', 0, '', 'activo'),
(238, 14, 'T3 TOTAL (11 - 15 AÑOS)', 0, 'ng/ml', 0, '', 'activo'),
(239, 14, 'T3 TOTAL ( 16 - 17 )', 0, 'ng/ml', 0, '', 'activo'),
(240, 14, 'T4 TOTAL', 0, 'nmol/L', 0, '', 'activo'),
(241, 14, 'INMUNOSEROLOGIA', 30, 'mg/L', 0, 'PROTEINA C REACTIVA: NEGATIVO MENOR A 10~PROTEINA C REACTIVA: POSITIVA MAYOR A 10', 'activo'),
(242, 14, 'FERRITINA HOMBRE', 0, 'ng/mL', 0, '', 'activo'),
(243, 34, 'CREATININA EN ORINA', 0, 'mg/24H', 0, '', 'activo'),
(244, 4, 'INR', 5, '', 0, '', 'activo'),
(245, 33, 'ESPERMATOZOIDES', 11, '', 0, '', 'activo'),
(246, 33, 'CELULAS EPITELIALES', 1, '', 0, 'ESCASAS~MODERADAS~ABUNDANTES', 'activo'),
(247, 33, 'BACTERIAS', 2, '', 0, 'ESCASAS~MODERADAS~ABUNDANTES', 'activo'),
(248, 33, 'MUCINA', 3, '', 0, 'ESCASA~MODERADA~ABUNDANTE', 'activo'),
(249, 33, 'CRISTALES DE URATOS AMORFOS', 6, '', 0, 'ESCASOS~MODERADOS~ABUNDANTES', 'activo'),
(250, 33, 'CRISTALES DE FOSFATOS AMORFOS', 7, '', 0, 'ESCASOS~MODERADOS~ABUNDANTES', 'activo'),
(251, 1, '1231123', 0, '123', 0, '', 'inactivo'),
(252, 1, 'HEMOGLOBINA MUJERES', 2, 'g/dl', 0, NULL, 'activo'),
(253, 1, 'HEMOGLOBINA NIÑOS', 3, 'g/dl', 0, NULL, 'activo'),
(254, 1, 'HEMATOCRITO HOMBRES', 4, '%', 0, NULL, 'activo'),
(255, 1, 'HEMATOCRITO MUJERES', 5, '%', 0, NULL, 'activo'),
(256, 1, 'HEMATOCRITO NIÑOS', 6, '%', 0, NULL, 'activo'),
(257, 1, 'LEUCOCITOS ADULTOS', 7, 'mm3', 0, NULL, 'activo'),
(258, 1, 'LEUCOCITOS NIÑOS', 8, 'mm3', 0, NULL, 'activo'),
(259, 1, 'FORMULA LEUCOCITARIA', 9, '%', 0, NULL, 'activo'),
(260, 1, 'NEUTROFILOS', 10, '%', 0, NULL, 'activo'),
(261, 1, 'LINFOCITOS', 11, '%', 0, NULL, 'activo'),
(262, 1, 'EOSINOFILOS', 12, '%', 0, NULL, 'activo'),
(263, 1, 'MONOCITOS', 13, '%', 0, NULL, 'activo'),
(264, 1, 'BASOFILOS', 14, '%', 0, NULL, 'activo'),
(265, 1, 'PLAQUETAS', 15, 'mm3', 0, NULL, 'activo'),
(266, 33, 'CILINDRO LEUCOCITARIO', 14, '', 0, '', 'activo'),
(267, 33, 'CILINDRO HIALINO', 13, '', 0, '', 'activo'),
(268, 33, 'CILINDRO GRANULOSO', 15, '', 0, '', 'activo'),
(269, 45, 'PROTEINA DE BENCE - JONES', 0, '', 0, '', 'activo'),
(270, 60, 'GLOBULINA', 3, 'g/dl', 0, '', 'activo'),
(271, 60, 'ALBUMINA', 2, 'g/dl', 0, '', 'activo'),
(272, 60, 'PROTEINAS TOTALES', 1, 'g/dl', 0, '', 'activo'),
(273, 60, 'RLCION ALB/GLOB', 4, '', 0, '', 'activo'),
(274, 61, 'HEMOGLOBINA', 1, 'g/dl', 0, '\r\n', 'activo'),
(275, 61, 'HEMATOCRITO', 2, '%', 0, '', 'activo'),
(276, 61, 'LEUCOCITOS', 3, 'mm3', 0, '', 'activo'),
(277, 61, 'PLAQUETAS', 5, 'mm3', 0, '', 'activo'),
(278, 62, 'BILIRRUBINA DIRECTA', 1, 'mg/dl', 0, '', 'activo'),
(279, 62, 'BILIRRUBINA INDIRECTA', 2, 'mg/dl', 0, '', 'activo'),
(280, 62, 'BILIRRUBINA TOTAL', 3, 'mg/dl', 0, '', 'activo'),
(281, 33, 'ACUMULOS LEUCOCITARIOS', 6, '', 0, '0 - 1 x cp.~0 - 2 x cp.~1 - 3 x cp.', 'activo'),
(282, 31, 'COLOR', 3, '', 0, 'AMBAR~VERDOSO~AMARILLO~ROJIZO~AMARILLO CLARO', 'activo'),
(283, 33, 'LEUCOCITOS', 4, '', 0, '0 - 2 x cp.~0 - 4 x cp.~1 - 3 x cp.~1 - 5 x cp.~2 - 4 x cp.~2 - 6 x cp.~3 - 6 x cp.~5 - 10 x cp.~10 - 20 x cp.~INCONTABLES x cp.', 'activo'),
(284, 33, 'HEMATIES', 5, '', 0, '0 - 2 x cp.~0 - 4 x cp.~1 - 3 x cp.~1 - 6 x cp.~2 - 4 x cp.~2 - 6 x cp.~3 - 8 x cp.~5 - 10 x cp.~10 - 20 x cp.~INCONTABLES x cp.', 'activo'),
(285, 33, 'CRISTALES DE OXALATO DE CALCIO', 8, '', 0, 'ESCASOS~MODERADOS~ABUNDANTES', 'activo'),
(286, 33, 'CRISTALES DE ACIDO URICO', 9, '', 0, 'ESCASOS~MODERADOS~ABUNDANTES', 'activo'),
(287, 33, 'LEVADURAS', 10, '', 0, 'PRESENTES~ABUNDANTES~ESCASAS~MODERADAS', 'activo'),
(288, 2, 'MAGNESIO', 24, 'mg/dl', 0, '', 'activo'),
(289, 2, 'HIERRO', 25, 'ng/dl', 0, '', 'activo'),
(290, 68, 'LH', 0, 'mUI/ml', 0, '', 'activo'),
(291, 69, 'HEPATITIS C', 0, 'COI', 0, '', 'activo'),
(292, 8, 'H.I.V.', 1, '', 0, 'DETECTABLE~NO DETECTABLE', 'activo'),
(293, 64, 'CALCIO IONICO', 0, 'mg/dl', 0, '', 'activo'),
(294, 71, 'TROPONINA I CUALITATIVA', 0, '', 0, 'POSITIVA~NEGATIVA', 'activo'),
(295, 66, 'PROGESTERONA', 0, 'ng/ml', 0, '', 'activo'),
(296, 33, 'CELULAS RENALES', 16, '', 0, 'ESCASAS~MODERADAS~ABUNDANTES', 'activo'),
(297, 33, 'CRISTALES DE FOSFATO AMONIACO', 17, '', 0, 'ESCASOS~MODERADOS~ABUNDANTES', 'activo'),
(298, 63, 'GRUPO SANGUINEO', 1, '', 0, 'A~B~AB~O', 'activo'),
(299, 63, 'FACTOR RH', 2, '', 0, 'POSITIVO~NEGATIVO', 'activo'),
(300, 47, 'HECES SERIADAS', 0, '', 0, 'MUESTRA N° 1~MUESTRA N° 2~MUESTRA N° 3', 'activo'),
(301, 59, 'PROLACTINA', 0, 'mg/dl', 0, 'MUJERES V.R:~HOMBRES V.R:~V.R NIÑOS:', 'activo'),
(302, 67, 'FSH                                                                                                                                                   ', 0, 'mUI/ml              ', 0, '~', 'activo'),
(303, 14, 'TESTOSTERONA TOTAL                                                                                                                                    ', 0, 'ng/ml               ', 0, '~', 'activo'),
(304, 33, 'LEVADURAS Y PSEUDOHIFAS', 19, '', 0, 'ESCASAS~MODERADAS~ABUNDANTES', 'activo'),
(305, 33, 'CELULAS DE TRANSCISION', 18, '', 0, '0-2 x cpo~1-2 x cpo~1-3 x cpo\r\n~2-4 x cpo~3--5 x cpo~4-6 x cpo', 'activo'),
(306, 47, 'FLORA BACTERIANA', 10, '', 0, 'ESCASA~NORMAL~AUMENTADA', 'activo'),
(307, 61, 'FORMULA LEUCOCITARIA', 4, '%', 0, 'NEUTROFILOS 70%~LINFOCITOS 30%~ESOSINOFILOS~MONOCITOS~BASOFILOS~LINFOCITOS ATIPICOS', 'activo'),
(308, 2, 'GLICEMIA POSTPRANDIAL', 2, 'mg/dl', 0, '', 'activo'),
(309, 1, 'RETICULOCITOS ADULTOS', 32, '%', 0, NULL, 'activo'),
(310, 1, 'FROTIS DE SANGRE PERIFERICA', 33, '4', 0, NULL, 'activo'),
(311, 1, 'RBC', 16, '10^6/uL', 0, NULL, 'activo'),
(312, 1, 'MCV', 17, 'fL', 0, NULL, 'activo'),
(313, 1, 'MCH', 18, 'Pg', 0, NULL, 'activo'),
(314, 1, 'MCHC', 19, 'g/dL', 0, NULL, 'activo'),
(315, 1, 'TIEMPOS DE COAGULACION', 31, '56', 0, NULL, 'activo'),
(316, 1, 'CAYADO', 22, '%', 0, NULL, 'activo'),
(317, 1, 'ERITROBLASTOS', 23, '%', 0, NULL, 'activo'),
(318, 1, 'MIELOBLASTO', 24, '%', 0, NULL, 'activo'),
(319, 1, 'CELULAS INMADURAS', 25, '%', 0, NULL, 'activo'),
(320, 1, 'PROMIELOBLASTO', 26, '%', 0, NULL, 'activo'),
(321, 1, 'T.P. (CONTROL)', 27, 'Seg.', 0, NULL, 'activo'),
(322, 1, 'T.P (PACIENTE)', 28, 'Seg.', 0, NULL, 'activo'),
(323, 1, 'T.P.T. (PACIENTE)', 30, 'Seg.', 0, NULL, 'activo'),
(324, 1, 'T.P.T. (CONTROL)', 29, 'Seg.', 0, NULL, 'activo'),
(325, 1, 'RDW-CV', 20, '%', 0, NULL, 'activo'),
(326, 1, 'RDW-SD', 21, 'fL', 0, NULL, 'activo'),
(327, 5, 'VLDL', 6, 'mg/dl', 0, '', 'activo'),
(328, 8, 'PROTEINA C REACTIVA cualitativa', 4, '', 0, 'NEGATIVA~POSITIVA', 'activo'),
(329, 8, 'RA- TEST', 9, '', 0, 'NEGATIVA~POSITIVA', 'activo'),
(330, 8, 'PRUEBA DE EMBARAZO EN SANGRE (BHCG)', 7, '', 0, 'NEGATIVA~POSITIVA', 'activo'),
(331, 47, 'SANGRE OCULTA EN HECES', 16, '', 0, 'NEGATIVO~POSITIVO', 'activo'),
(332, 14, 'T3 LIBRE', 0, 'pg/ml', 0, '', 'activo'),
(333, 14, 'T4 LIBRE', 0, 'pmol/L', 0, '', 'activo'),
(334, 14, 'TSH (ELISA)', 0, 'uIU/ml', 0, '', 'activo'),
(335, 14, 'PSA LIBRE', 0, 'ng/mL', 0, '', 'activo'),
(336, 65, 'ESTRADIOL (ESTROGENO)', 0, 'pg/mL', 0, '', 'activo'),
(337, 70, 'HEMOGLOBINA GLICOSILADA', 0, '%', 0, '', 'activo'),
(338, 1, 'VSG', 34, 'x mm3', 0, NULL, 'activo'),
(339, 14, 'PROLACTINA EN NIÑOS', 31, 'ng/ml', 0, '', 'activo'),
(340, 2, 'FOSFORO EN NIÑOS', 26, 'mg/dl', 0, '', 'activo'),
(341, 4, 'T.P (C)', 1, 'Seg.', 0, '', 'activo'),
(342, 4, 'T.P (P)', 1, 'Seg.', 0, '', 'activo'),
(343, 4, 'T.P.T (C)', 2, 'Seg.', 0, '', 'activo'),
(344, 4, 'T.P.T (P)', 2, 'Seg.', 0, '', 'activo'),
(345, 8, 'PROTEINA C REACTIVA Cuantitativa', 5, 'mg/L', 0, '', 'activo'),
(346, 82, 'das', 0, 'ads', 0, NULL, 'inactivo'),
(347, 82, 'asd', 0, 'asd', 0, '123~1548', 'inactivo'),
(348, 83, 'fas', 2, '12', 0, '', 'activo'),
(349, 84, 'fas', 2, '12', 0, '', 'activo');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detalles_examenes_paciente`
--

CREATE TABLE `detalles_examenes_paciente` (
  `id` int(11) NOT NULL,
  `id_dt` int(11) NOT NULL,
  `id_ex` int(11) NOT NULL,
  `id_ex_pac` int(11) NOT NULL,
  `id_rango` int(11) NOT NULL,
  `resultado` mediumtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `examenes`
--

CREATE TABLE `examenes` (
  `id` int(11) NOT NULL,
  `nombre` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `examenes`
--

INSERT INTO `examenes` (`id`, `nombre`) VALUES
(1, 'HEMATOLOGIA COMPLETA'),
(2, 'QUIMICA SANGUINEA'),
(3, 'GLOBULINAS'),
(4, 'COAGULACION SANGUINEA'),
(5, 'LIPIDOS'),
(6, 'ELECTROLITOS SERICOS'),
(7, 'BACTERIOLOGIA '),
(8, 'SEROLOGIA'),
(9, 'PRUEBAS ESPECIALES                                          '),
(10, 'CURVA DE TOLERANCIA GLUCOSADA '),
(11, 'TEST DE LACTOSA '),
(12, 'HIERRO SERICO '),
(13, 'GLUCOSA POS-PANDRIAL                                        '),
(14, 'PRUEBAS HORMONALES'),
(15, 'PH Y GASES ARTERIALES '),
(16, 'ANALISIS MACROSCOPICO DE LIQUIDO CEFALORRAQUIDEO '),
(17, 'ANALISIS MICROSCOPICO DE LIQUIDO CEFALORRAQUIDEO: '),
(18, 'ANALISIS QUIMICO DE LIQUIDO CEFALORRAQUIDEO: '),
(19, 'ANALISIS MACROSCOPICO LIQUIDO SINOVIAL '),
(20, 'ANALISIS MICROSCOPICO DE LIQUIDO SINOVIAL '),
(21, 'ANALISIS QUIMICO DE LIQUIDO SINOVIAL '),
(22, 'ANALISIS MACROSCOPICO DE LIQUIDO PLEURAL '),
(23, 'ANALISIS MICROSCOPICO DE LIQUIDO PLEURAL '),
(24, 'ANALISIS QUIMICO DE LIQUIDO PLEURAL '),
(25, 'ANALISIS MACROSCOPICO DE LIQUIDO PERICARDIO '),
(26, 'ANALISIS MICROSCOPICO DE LIQUIDO PERICARDIO '),
(27, 'ANALISIS QUIMICO DE LIQUIDO PERICARDIO '),
(28, 'ANALISIS MACROSCOPICO DE LIQUIDO PERITONEAL O ASCITICO '),
(29, 'ANALISIS MICROSCOPICO DE LIQUIDO PERITONEAL O ASCITICO '),
(30, 'ANALISIS QUIMICO DE LIQUIDO PERITONEAL O ASCITICO'),
(31, 'EXAMEN MACROSCOPICO DE ORINA'),
(32, 'CARACTERISTICAS QUIMICAS DE EXAMEN DE ORINA'),
(33, 'EXAMEN MICROSCOPICO DE LA ORINA'),
(34, 'DEPURACION DE CREATININA EN ORINA DE 24 HORAS'),
(35, 'PRUEBA DE EMBARAZO EN ORINA '),
(36, 'PROTEINAS EN ORINA DE 24 HORAS '),
(37, 'CALCIO EN ORINA DE 24 HORAS '),
(38, 'FOSFORO EN ORINA DE 24 HORAS '),
(39, 'ACIDO URICO EN ORINA DE 24 HORAS'),
(40, 'UREA EN ORINA DE 24 HORAS '),
(41, 'SODIO EN ORINA DE 24 HORAS '),
(42, 'POTASIO EN ORINA DE 24 HORAS '),
(43, 'CLORO EN ORINA DE 24 HORAS '),
(44, 'AMILASURIA'),
(45, 'PROTEINA DE BENCE - JONES'),
(46, 'RECUENTO MINUTADO '),
(47, 'EXAMEN DE HECES'),
(48, 'EXAMEN MICROSCOPICO DE HECES METODO DIRECTO '),
(49, 'TRANSAMINASA OXALACETICA                                    '),
(50, 'TRANSAMINASA PIRUVICA                                       '),
(51, 'BILIRRUBINA TOTAL                                           '),
(52, 'BILIRRUBINA DIRECTA                                         '),
(53, 'BILIRRUBINA INDIRECTA                                       '),
(54, 'LACTATO DESHIDROGENASA                                      '),
(55, 'CALCIO SERICO                                               '),
(56, 'ACIDO URICO'),
(57, 'CREATININA                                                  '),
(58, 'UREA                                                        '),
(59, 'PROLACTINA'),
(60, 'PROTEOGRAMA'),
(61, 'HEMATOLOGIA COMPLETA'),
(62, 'BILIRRUBINAS'),
(63, 'GRUPO SANGUINEO'),
(64, 'CALCIO IONICO'),
(65, 'ESTRADIOL'),
(66, 'PROGESTERONA'),
(67, 'FSH                                                                                                                                                   '),
(68, 'LH'),
(69, 'HEPATITIS C'),
(70, 'HEMOGLOBINA GLICOSILADA'),
(71, 'TROPONINA I CUALITATIVA'),
(72, 'Antony'),
(73, 'Antony'),
(74, 'Antony'),
(75, 'daasdads'),
(76, 'daasdads'),
(77, ''),
(78, ''),
(79, 'dsf'),
(80, 'and'),
(81, 'asasd'),
(82, 'uyiiu'),
(83, 'sa'),
(84, 'sa');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `examenes_paciente`
--

CREATE TABLE `examenes_paciente` (
  `id` int(11) NOT NULL,
  `id_ex` int(11) NOT NULL,
  `id_pac` int(11) NOT NULL,
  `id_bio` int(11) NOT NULL,
  `fecha` timestamp NOT NULL DEFAULT current_timestamp(),
  `fecha_actualizacion` timestamp NULL DEFAULT NULL,
  `id_usuario` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `niveles_usuario`
--

CREATE TABLE `niveles_usuario` (
  `id` int(11) NOT NULL,
  `nombre` varchar(30) NOT NULL,
  `descripcion` tinytext DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `niveles_usuario`
--

INSERT INTO `niveles_usuario` (`id`, `nombre`, `descripcion`) VALUES
(1, 'Usuario', 'Usuario regular, nivel bajo de usuario'),
(2, 'Coordinador', 'Nivel medio de usuario'),
(3, 'Administrador', 'Nivel alto de usuario'),
(4, 'Superior', 'Nivel mas alto de usuario');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pacientes`
--

CREATE TABLE `pacientes` (
  `id` int(11) NOT NULL,
  `cedula` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `direccion` text NOT NULL,
  `telefono` varchar(12) NOT NULL,
  `correo` tinytext NOT NULL,
  `fecha_nacimiento` date NOT NULL,
  `pre_cedula` varchar(2) NOT NULL,
  `genero` varchar(10) DEFAULT NULL,
  `foto_carnet` mediumblob DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `pacientes`
--

INSERT INTO `pacientes` (`id`, `cedula`, `nombre`, `direccion`, `telefono`, `correo`, `fecha_nacimiento`, `pre_cedula`, `genero`, `foto_carnet`) VALUES
(24, 28582670, 'Antony', 'Soler2', '04146680992', 'antonymanuelbeni77tez@gmail.com', '2001-10-12', 'V', 'Mujer', NULL),
(25, 29666666, 'Antony Benitez', 'pppppp', '04146680987', 'antonymanuelbenitez@gmail.com', '2023-08-01', 'V', 'Hombre', NULL),
(26, 28146771, 'Fabian Silva', 'El Silencio', '04146308395', 'silvabravofabian@gmail.com', '2002-12-17', 'V', 'Hombre', NULL),
(31, 28146771, 'Fabiansito', 'El Silencio', '04146308395', 'silvabravofabian@gmail.com', '2020-12-17', 'N', 'Hombre', NULL),
(32, 28146771, 'Olivia', 'El Silencio', '04146308395', 'silvabravofabian@gmail.com', '2023-12-18', 'N', 'Hombre', NULL),
(33, 28146772, 'Fabian 2', 'El silencio', '04146308395', 'fabian2@gmail.com', '2002-12-17', 'V', 'Hombre', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rangos_detalle`
--

CREATE TABLE `rangos_detalle` (
  `id` int(11) NOT NULL,
  `id_det_ex` int(11) NOT NULL,
  `desde` int(11) DEFAULT NULL,
  `hasta` int(11) DEFAULT NULL,
  `inferior` decimal(5,2) NOT NULL,
  `superior` decimal(5,2) NOT NULL,
  `genero` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `rangos_detalle`
--

INSERT INTO `rangos_detalle` (`id`, `id_det_ex`, `desde`, `hasta`, `inferior`, `superior`, `genero`) VALUES
(1, 349, 0, 0, 1.00, 15.00, 'Mujer'),
(2, 349, 0, 0, 2.00, 16.00, 'Hombre');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `pre_cedula` varchar(2) NOT NULL,
  `cedula` int(11) NOT NULL,
  `password` text NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `correo` tinytext NOT NULL,
  `telefono` varchar(12) NOT NULL,
  `direccion` text NOT NULL,
  `foto_carnet` mediumblob NOT NULL,
  `nivel` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `pre_cedula`, `cedula`, `password`, `nombre`, `correo`, `telefono`, `direccion`, `foto_carnet`, `nivel`) VALUES
(5, 'V', 28146771, '$2b$04$YGVtJYbYnEnKemyDy3VBxu6xXeti08efB7wVyY0Pe9C/Zr81K4Kyq', 'Fabian Silva Bravo', 'silvabravofabian@gmail.com', '04146308395', 'San Francisco', '', 3),
(6, 'V', 123, '$2b$04$Ih7JFMxYtPcWXrKupAjqnuLz.WSpE8l3Oaxofbl5IlKb4TfDbsbEi', 'prueba', 'prueba@gmail.com', '123', 'prueba', '', 3);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `bioanalistas`
--
ALTER TABLE `bioanalistas`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `cedula` (`cedula`);

--
-- Indices de la tabla `detalles_examen`
--
ALTER TABLE `detalles_examen`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `detalles_examenes_paciente`
--
ALTER TABLE `detalles_examenes_paciente`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `examenes`
--
ALTER TABLE `examenes`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `examenes_paciente`
--
ALTER TABLE `examenes_paciente`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `niveles_usuario`
--
ALTER TABLE `niveles_usuario`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `pacientes`
--
ALTER TABLE `pacientes`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `rangos_detalle`
--
ALTER TABLE `rangos_detalle`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `cedula` (`cedula`),
  ADD KEY `FK_nivel_usuario` (`nivel`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `bioanalistas`
--
ALTER TABLE `bioanalistas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=45;

--
-- AUTO_INCREMENT de la tabla `detalles_examen`
--
ALTER TABLE `detalles_examen`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=350;

--
-- AUTO_INCREMENT de la tabla `detalles_examenes_paciente`
--
ALTER TABLE `detalles_examenes_paciente`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `examenes`
--
ALTER TABLE `examenes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=85;

--
-- AUTO_INCREMENT de la tabla `examenes_paciente`
--
ALTER TABLE `examenes_paciente`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `niveles_usuario`
--
ALTER TABLE `niveles_usuario`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `pacientes`
--
ALTER TABLE `pacientes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT de la tabla `rangos_detalle`
--
ALTER TABLE `rangos_detalle`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `FK_nivel_usuario` FOREIGN KEY (`nivel`) REFERENCES `niveles_usuario` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
