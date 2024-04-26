-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 26-04-2024 a las 04:52:20
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
  `ministerio` varchar(20) DEFAULT NULL,
  `pre_cedula` varchar(2) NOT NULL,
  `foto_carnet` mediumblob DEFAULT NULL,
  `foto_firma` mediumblob DEFAULT NULL,
  `status` varchar(9) NOT NULL DEFAULT 'activo'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `bioanalistas`
--

INSERT INTO `bioanalistas` (`id`, `cedula`, `nombre`, `ingreso`, `telefono`, `direccion`, `colegio`, `ministerio`, `pre_cedula`, `foto_carnet`, `foto_firma`, `status`) VALUES
(44, 28146772, 'Bioanalista1', '2024-02-16', '04146308395', 'San francisco', '111', NULL, 'V', NULL, 0x646174613a696d6167652f706e673b6261736536342c6956424f5277304b47676f414141414e5355684555674141414f45414141446843414d414141414a62534a49414141416846424d5645582f2f2f3841414144382f507745424154352b666e31396657397662335a32646e63334e7a6d3575624d7a4d7a73374f77354f546e7036656e7938764b34754c682b666e354f546b36566c5a577071616d48683465656e70375430394e36656e717973724b586c35646358467a507a382b377537744953456a68346546776348426e5a32636a49794d784d5445374f7a745a57566c4c5330736e4a79654d6a49776147686f734c43776247787351454243382f496b35414141516d6b6c45515652346e4f3164683362694f68433135495a74634f2f67546943452f2f2b2f4e794f626c71575a78425a35783366505755497836434a706d6d5947515a677759634b4543524d6d544a677759634b4543524d6d544a677759634b4543574f424174722f3452622f4641343337496e324e514c7462727058305a747639336478516571764d6378314a64437437645a4e416b384a45624f5a47717271636857344e6b4f524e58553954794e416f6d7135775876455639417451675935562b4934397277413462724f6e76524736556e764e6f33746343545a73414c6e382f7434786634556953753847554e427465796f724d346f696431667239415452644b387a787a69347454584c394234414a303373524f6f454a485856754a644a4c7835485545466c793272333062456d396752564268676951493276496d64494131436b4a43634e37456a7a4548346963546a546579495943434763304636453455787a44594530545637453655762f3250432f425a462f30305968722b764367395976416444647a6947506d39754c6562444d647849764d6b786c32492f484d4f3355496c554873416b50634c69545139415a384d52464d6d614e37334f374234514f6e2b4651624e4247647238475334474a556a322f4b587073497355777a573830517a4d6b4c2b585741394c554354612f35346839344455626d69474e6d65437332454a6f6a58426d61452f6f4d6e574965536f45754754687a524b4f3368386c66345167644a764b446a536f34492b4e4431417733454b3233442b344668775a446977326432425a397a5547494d672b65526f6663646a454f52713168546a4d4f52347a75614d772f434c583272477878674d43633959786e774d656d42545a4c7759686d4d515a4441344d5179474e306f376d4a77594a695078477a49796a4a6b6b636d446274674a2f667a7576704f44666a7a57483634746350705a395a65714272776a796a786b4b677270686e314871777556327034493267757655517351446a484f476772426749624366473352483777476f6c4f47334a2b3052584b664470322f4e6934395755394a6d754a6a4354334635527039466962356765594f53706f306e53526b4b76593236616376676d417149427876305a3161726376595278776d624136707836625837596463416a766661322f4b48556e5a3974744e45774f586445516d655a51436566613734382b4f704d546d384375562f7a2f426e682f326a7545632f776b394478695a6d41346b6a62376c652b436c444b6f546c2b374a442f4a67687947497a395079687a39422b6770394a6d69506b4d506143793131355772756e7247375358347563336f52642b4d2b57754868415a48665048326c5776305077774e4d30777a674f334e4b704c31686448334e76484e2b7a6a44305859582b50566c36792f3572623336336c3133456f707a692b6e5747415152664d5a71717142416b4d4a72476233573558372b6f58596a64375248564d41457a4f446b574e6347563546386d5070653847586869476171354a624744447852713947796c4c433858537739424c3535767232564c69563156746d675a7479336d365655374f72624651645556522f3530544662374c686161707571347342364e7a42536e5a58334f396a313870664c75796e487542353659375a76434a6d523076565532574a4b79486b633246386330646f3933746435686e4351746a4f767337386e4874595870656c74614e6835716d615a6a66504a31547364725a68665466716a567776474674646938596345332b412f422f7436392b6f796457682f763358372f6d63684b735976546b56596266377a39346e34494c5178436c36717658797145464174674875496d3156422b6d41764e68754358457544754837446c6a686f563673514949387a414f6b71697072776a5954526e356e6a653739565a3847456145305075725645335756374a7471766e4875676955634a5a72686d486b3841304564746d2b72727a31546e77594e76697064786d57684f7a4b784e49424d4956573467614b6d692b75436b4e71476e6d3476486e59793466686a7577664d4454564a3054377366723548766777334a447150734f6a5071526e443569474f707546756d4c466c72375546643251757166756b755331536a2b6655785a796e754d7154645a5a30325456507a4a6d625875774a2b2f4850666b7778452b39747279367836515a73504c38394851414a7a627a2b647a786b7941493468567354632b4c56334630566a52635a396d323332634e692b324e4e4241714c574c58586e64425733486e52473643326b4b5872773952586968657349314b4a3675727278765a51644644715459456c4275567572534e685839734c574356333642316576583538354a3067345a5069447a2b484d374170626b36494d4f337a7266566d536c747a6c5446745730662b777045667242535165714168356d6278674f686d2f7a41666e6f6443367a5576625950322f2f4f5841737147316f593238583674764e66337638736a3839522f75373638547139634a7a796c567473446a79794a49687a773167594345316442594762674232774c5973487752614c44384d537a3762614a586a4671324d55323468475539692b7039773372302f4e5436354235385051772b54572b334163647a557a75303132583151637a514a7a73636a44454977434d466842784a5a70756b37686d316f4a342b642b365368715150345a326b4c54744c75667a37626c4132456f7a3354506a7370626b646e506b577543325a6c2b54564c335a4b5073737a49716f736747575a6c3471502b574e367a734d306a3545705268424e50304f44506e706d733144444353704c635a556665696f395538793949435950746276307a4c7373442f796d4c4c327271552f397077647a42716c41336e454f5066335a6d7065456c554a4433366d52784376493876655751372f446155422b5035645a526a79394c563241797657686444776871623458554c6355423472347753747470586c7159596c656c39656a4e366e76424c44456e57486d64472b2f376e6b614e336b48677077377651735143474173502b6452716a653844394f37614970414a6650636552656d547039633059473563656f6e64444535486f4b6e46597a4d6b6776724470737856467548426b53426a4536416b58764247316459692f4e704c566a2b486f356341555866772b5178524a4932696b3743365059542f324b7a376c344f4a66704c77394d516c4567576b2f65467379634f31584d6a563637524f562b76564f416f595333637950387441682f644c6764324d54525053736a375742306d6b7a4a555444596f326e5630484a673648637236506c444854457164355667555737367145772b4a5376396372714b7a43736178345a356d546271384b575435386174513944384e43647a394f317446346a3557635a4f6c78715a6e6f3145797a673552766e2f4e7161776c4a396c694766587161306a786573674b61767a764f5662574c30324d6b616e396f312b757847456b6d4e72362f4f357842467a664d4f4367393651712f32516748613237747a68696f572b6a786e766f75382b6e78532b72524b724e68425458334f63455a692b44393937767266533044736a53667a454e737131777547426d75566f4479317a6a392f584e7a304f703472587674734d2f5232357836517757672f31776b7434304d4f515a2f625346316a6930313664715745506135776d5437426b475062434971745452344d45557463727a41554b6a597a54796d636d412b37466f736e62457539446246496e2b58356c65734b4835532f6e6d444974577545304478635a716a6e5753624e5a58464c4a4449422b30784569364f6759534f387878416d7544724d5149356e635366597248515164657274565943526752325a382b3150383667683356642b4f4e6e554c34743550585a6352682f59332f4e465455592f736669472b2b613362787a7a6c72334c4538426c4b30416f70586538734d4c4d2b58637574384479763970616f584b4b73374943464c73586e64646b38614e7439597a506b4f2b56464b786d7041355a6e69376e4c6b71593775304a4d38387543742b4c4c53754f7263424e764a56755342645a657a445a333571775243426b3234494a516345672f795644516a5a62644a672f4d4d7a476c364642626b56724c334d72365064697a3579306f6763724579546c2b324a50593559667455434c686d397a53475939507a67586b70426f386b2b7352643252357554347955725a734d50386a5a4f36537673724c424c36562f7737732b73595237756661457146764353312b6631426330743268356f556469504a78754b51414e5a7530594b72766d384851675878555453546f7278497a63747667553173634e49674c4666342b4a3764386f5a4e58762f326946394164446478454d64716b666d316851797a794b622f39767a626e49335344743764786e38772f68436a6764647a62646d6c4e362b5671744554686134694a50636134464d71375738775a4c2b4d7362397a35734b324f50383275344b51456646327367756c4e724550577673775772594a777932493459685675643749707662354b384d5773457a764e496f4e695550726a6145425a4f456b4f6330534d3738396e4b66722b582f41384a4e4c65766356674163553374354c4764696a6e592f30575236693831537179566f3163566158354f7571736b45423951374e7268453669326e6657476b424f33454b536e2b37395a303270514b324a6b3150546469384735616e5754394f37787748544a516f742f625366482f6d7743716b61717642457641596a6d6d6e3966566757737a6672656767735a44623476704b4d397334457471653645645a4c4b466d566d4131696e78346a654a63465653775565396e7259364a4447795759316b6f473155386c356e6437524664317a736a484f2b446859326e46616e473169716c69364a3139616e327156347142764d54322b754d54755547514a77637a573870517a4f6b5a49654661466a6d5a43304c736d3630356f336b5a356b547157784e533549703679523245386b30775541724c766b6f372f587a65534273736d34304b684d7447387a6a587870536c594a4e717675674554583843734c756536414c47736452457055474b62656976396b62384a31635a6745586f79664e3367504654644d4a6d7956725645464b744a75546b41527a306c676b4936472f5732744341776234556c6f5a51754e486d7a534b6962776a436c67453443726d614c39516c6c364e6b773147643857563079556f2b724e4e7139593668696b4b5139306c6d4f396570477569565356525a36544d4e4b4c754e353774424b52774e414a43783350536a4651796247594434786f3055664447666163667a7850612b44773754554c6648583157556d4b316b75523877585a536173385263784951302f39794d7831325a72304f4e686278694577436a3551576366466942512f68536f3957446b356a2f527564796e34564d496b6b523461597445596c556d49596a704c4933734d306876744d4a52615250344f6f3948597963655978384c544a496e4a557370385276384a4a724775424e6a566d4e4d41576668746c65494c645a62314958796d4b6d77436b7a63654d424e554f35677238514755666b7756527336326255544861653053745536497152415872756d6e57613568456d3869774f44577267455736666176667347536730715a4c43766e345a467351574735584a43487a4e45704e596d307a4945584d4b74686d777361484a617576516677594243597263556c5746673237694d574e5161575770486f6262643842375a58325a414b6e496743794e706e352b326865423574454a654748627a73364c4e74565751694f5857324a556a7056516f6b2b4a2f4234436d74346765746236706f6931534334336b635a4d72434144584e324c4a694b414c4f3664734b36717374506a7967726f6848463852556945437631686452755145464761356349645a44564d4c6462594b674956516b69696c6c354d77374a2b592f41416f5a4d4a7871324158387568446f54716a30735234586b62685953592b4e3565786d6d4c6b5747456648736a357a4d7969684c53536a6154567748517459634743592f614c6f7849445130624e70682b53447153536f54635a50554370474c55694753474339396d637a3051466a3736784b305a455a7231335579583752537a4a414b32486b55614545514e44764d5a58772f686d6857643147585170534658516b614a45317450784f4b4974674c4744616a72416c4247756e4c766449555172483236744c4c7646554a5269717537365667346838364f335a385134626855596e4e473743376a42575a6c3139424867706c5a4c6e43576d64484d53676f515a7159776c59526c724535677865694834565470724e5654706b4e614c31482f4f4937476859646c4a68585348477435704b44785a2f7259374c427636504739683971794e7a4c5a646437546557554d767351464b7568556d526f74493750476e516178575a63656f6752657931666d4b61574c35666855676c734c4e6f72306f2b7144654855474e37584f34624f4f2f795131565577435946426c77584943786878316b68733053323261584d7263543072624e734e746d52325967694b5658777a6d2f514572495852685a596846624b4d526178683058303254756e62766c39455739634e5045384a54526c3766683076704f3356614b6e4a68476b64546777657769646b6a74475a4c61762b615266626e466a58786e737161542f41597245316a2f79384f2f427759463455694d4836417a6567575450396e535a645054746c446d37373739695a34485170474b5959346f355950756d377a7147453974595832716273324d3873657954446f4435556d5276326e6f4b304257587846592f5a706749536c703958617867396e6a45763745312b4a50633677437a466f3365446c4f3239423832444c693446703942676e6a54336e38743767414c466158485a4a2f345a554a672b43554f764c3766794777734b486d4d732b7938314e4e596f3168715a62383451732f6c417a6d533975774b422b32584c47786251656d2b477a4e6b50424f326c412f694937382b735051637752554872737a3937543857536a4e372f346757414e634b302f697447535970693569386766476b71734167442b2f6a3943594457767471663976466c385a764c30514d774a742b2f6b6267706b73323747747a66774e5a62316173504e57325453393761586a73445a586d68367a377a4962576c634c7a54394a34465a5a4f4979586f397273464374726533313837424774676b374a442b76725058506d3139457248546f6e3845564e417872586d547348534b652b755678546c4b46724978336a4a4765674d5966327154384f7643653743375a6f78667a595476333248496f423279747a2b5559324f7a4c6e37524c5631354670647441394e334f744a2b467368676c6877366c6c55667471556f755853594a6e434e633963356c443056326c2b62506352427773795359327449574974524733656a732b43556e753972647a4f462f774c3071447a39797279343164336a4c334f736f7934762f302b6a4c63347a6457586c72632b7238665a3279434a786638525375776436696b684a656c666d56435a4c6d546d5466334544506b4475325336665068646a346638335a2f2b4176755542396f514a45795a4d6d444268776f514a45795a4d6d444268776f514a45796238332f45666f3748746863566465785541414141415355564f524b35435949493d, 'activo');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categoria_examen`
--

CREATE TABLE `categoria_examen` (
  `id` int(11) NOT NULL,
  `nombre` varchar(80) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `categoria_examen`
--

INSERT INTO `categoria_examen` (`id`, `nombre`) VALUES
(1, 'Basico2'),
(2, 'Especializados');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detalles_examen`
--

CREATE TABLE `detalles_examen` (
  `id` int(11) NOT NULL,
  `id_ex` int(11) NOT NULL,
  `nombre` tinytext NOT NULL,
  `posicion` int(11) NOT NULL DEFAULT 1000,
  `unidad` varchar(30) DEFAULT NULL,
  `impsiempre` tinyint(1) NOT NULL,
  `status` varchar(9) NOT NULL DEFAULT 'activo'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `detalles_examen`
--

INSERT INTO `detalles_examen` (`id`, `id_ex`, `nombre`, `posicion`, `unidad`, `impsiempre`, `status`) VALUES
(1, 3, 'TRANSAMINASA  P (PIRUVICA) HOMBRES ', 0, 'U/L ', 0, 'activo'),
(2, 5, 'PERFIL LIPIDICO ', 0, ' ', 0, 'activo'),
(3, 7, 'UROCULTIVO ', 0, ' ', 0, 'activo'),
(4, 7, 'HERMOCULTIVO ', 0, ' ', 0, 'activo'),
(5, 7, 'COPROCULTIVO ', 0, ' ', 0, 'activo'),
(6, 7, 'BK (DIRECTO CULTIVO) ', 0, ' ', 0, 'activo'),
(7, 7, 'ANTIBIOTICOGRAMA ', 0, ' ', 0, 'activo'),
(8, 7, 'DIRECTO (GRAM) ', 0, ' ', 0, 'activo'),
(9, 7, 'EN FRESCO ', 0, ' ', 0, 'activo'),
(10, 7, 'INV. DE CLAMYDIAS ', 0, ' ', 0, 'activo'),
(11, 3, 'GAMMA GLUTAMIL TRANSPEPTIDASA  (GGTP) HOMBRES ', 0, 'U/L ', 0, 'activo'),
(12, 3, 'GAMMA GLUTAMIL TRANSPEPTIDASA  (GGTP)  MUJERES ', 0, 'U/L ', 0, 'activo'),
(13, 8, 'REACCION DE BRUCELLA ABORTUS ', 0, ' ', 0, 'activo'),
(14, 9, 'LIPIDOGRAMA ', 0, ' ', 0, 'activo'),
(15, 9, 'COLESTEROL TOTAL ', 0, 'MG/DL ', 0, 'activo'),
(16, 9, 'HDL COLESTEROL ', 0, 'MG/DL ', 0, 'activo'),
(17, 9, 'VLDL COLESTEROL ', 0, 'MG/DL ', 0, 'activo'),
(18, 9, 'RELACION COL TOT/HDL COL HOMBRE ', 0, 'MG/DL ', 0, 'activo'),
(19, 9, 'RELACION COL TOT/HDL COL MUJERES ', 0, 'MG/DL ', 0, 'activo'),
(20, 9, 'FACTOR DE RIESGO ', 0, '% ', 0, 'activo'),
(21, 10, 'GLUCOSA EN AYUNAS ', 0, 'MG/DL ', 0, 'activo'),
(22, 10, 'GLUCOSA 30 MINUTOS ', 0, 'MG/DL ', 0, 'activo'),
(23, 10, 'GLUCOSA 60 MINUTOS ', 0, 'MG/DL ', 0, 'activo'),
(24, 10, 'GLUCOSA 120 MINUTOS ', 0, 'MG/DL ', 0, 'activo'),
(25, 11, 'GLUCOSA EN AYUNAS ', 0, 'MG/DL ', 0, 'activo'),
(26, 11, 'GLUCOSA 30 MINUTOS ', 0, 'MG/DL ', 0, 'activo'),
(27, 11, 'GLUCOSA 60 MINUTOS ', 0, 'MG/DL ', 0, 'activo'),
(28, 11, 'GLUCOSA 120 MINUTOS ', 0, 'MG/DL ', 0, 'activo'),
(29, 12, 'HIERRO SERICO ', 0, 'NG/DL ', 0, 'activo'),
(30, 12, 'WIBC ', 0, 'NG/DL ', 0, 'activo'),
(31, 12, 'TIBC ', 0, 'NG/DL ', 0, 'activo'),
(32, 12, 'SATURACION ', 0, '% ', 0, 'activo'),
(33, 15, 'PH ', 0, 'MML/DG ', 0, 'activo'),
(34, 15, 'PCO2 ', 0, 'MML/DG ', 0, 'activo'),
(35, 15, 'PO2 ', 0, 'MML/DG ', 0, 'activo'),
(36, 15, 'HCO3 ', 0, 'MML/DG ', 0, 'activo'),
(37, 15, 'TCO2 ', 0, 'MML/DL ', 0, 'activo'),
(38, 15, 'B.E. ', 0, 'MML/L ', 0, 'activo'),
(39, 15, 'SAT ', 0, '% ', 0, 'activo'),
(40, 16, 'ASPECTO: ', 0, ' ', 0, 'activo'),
(41, 16, 'COLOR ', 0, ' ', 0, 'activo'),
(42, 16, 'DENSIDAD: ', 0, ' ', 0, 'activo'),
(43, 17, 'CONTAJE DE CELULAS AD ', 0, 'MM3 ', 0, 'activo'),
(44, 17, 'RECUENTO DIFERENCIAL N: ', 0, 'MM3 ', 0, 'activo'),
(45, 18, 'GLUCOSA ', 0, ' ', 0, 'activo'),
(46, 18, 'PROTEINAS (LUMBAR) ', 0, ' ', 0, 'activo'),
(47, 18, 'PANDY (LISTOMAL) ', 0, ' ', 0, 'activo'),
(48, 18, 'PANDY (VENTRICULAR) ', 0, ' ', 0, 'activo'),
(49, 19, 'COLOR ', 0, ' ', 0, 'activo'),
(50, 19, 'ASPECTO ', 0, ' ', 0, 'activo'),
(51, 19, 'VISCOSIDAD ', 0, ' ', 0, 'activo'),
(52, 19, 'DENSIDAD ', 0, ' ', 0, 'activo'),
(53, 19, 'PH ', 0, ' ', 0, 'activo'),
(54, 19, 'COAGULO DE FIBRINA ', 0, ' ', 0, 'activo'),
(55, 19, 'TEST DE MUCINA ', 0, ' ', 0, 'activo'),
(56, 20, 'CONTAJE DE CELULAS ', 0, ' ', 0, 'activo'),
(57, 20, 'RECUENTO DIFERENCIAL ', 0, ' ', 0, 'activo'),
(58, 21, 'PROTEINAS ', 0, ' ', 0, 'activo'),
(59, 21, 'GLUCOSA ', 0, ' ', 0, 'activo'),
(60, 21, 'ACIDO URICO ', 0, ' ', 0, 'activo'),
(61, 21, 'COLESTEROL ', 0, ' ', 0, 'activo'),
(62, 22, 'ASPECTO ', 0, ' ', 0, 'activo'),
(63, 22, 'COLOR ', 0, ' ', 0, 'activo'),
(64, 22, 'PH ', 0, ' ', 0, 'activo'),
(65, 22, 'DENSIDAD ', 0, ' ', 0, 'activo'),
(66, 22, 'FORMACION DE COAGULO ', 0, ' ', 0, 'activo'),
(67, 23, 'CONTAJE CELULAR ', 0, ' ', 0, 'activo'),
(68, 23, 'RECUENTO DIFERENCIAL ', 0, ' ', 0, 'activo'),
(69, 24, 'REACCION DE RIVALTA ', 0, ' ', 0, 'activo'),
(70, 24, 'PROTEINAS ', 0, ' ', 0, 'activo'),
(71, 24, 'GLUCOSA ', 0, ' ', 0, 'activo'),
(72, 24, 'ENZIMAS LDH ', 0, ' ', 0, 'activo'),
(73, 24, 'COLESTEROL ', 0, ' ', 0, 'activo'),
(74, 25, 'VOLUMEN ', 0, ' ', 0, 'activo'),
(75, 25, 'COLOR ', 0, ' ', 0, 'activo'),
(76, 25, 'ASPECTO ', 0, ' ', 0, 'activo'),
(77, 25, 'DENSIDAD ', 0, ' ', 0, 'activo'),
(78, 25, 'PH ', 0, ' ', 0, 'activo'),
(79, 25, 'PRESENCIA DE COAGULOS ', 0, ' ', 0, 'activo'),
(80, 26, 'RECUENTO CELULAR ', 0, ' ', 0, 'activo'),
(81, 26, 'RECUENTO DIFERENCIAL ', 0, ' ', 0, 'activo'),
(82, 27, 'RIVALTA ', 0, ' ', 0, 'activo'),
(83, 27, 'PROTEINAS ', 0, ' ', 0, 'activo'),
(84, 27, 'GLUCOSA ', 0, ' ', 0, 'activo'),
(85, 28, 'ASPECTO ', 0, ' ', 0, 'activo'),
(86, 28, 'COLOR ', 0, ' ', 0, 'activo'),
(87, 28, 'REACCION ', 0, ' ', 0, 'activo'),
(88, 28, 'DENSIDAD ', 0, ' ', 0, 'activo'),
(89, 28, 'PRESENCIA DE COAGULOS ', 0, ' ', 0, 'activo'),
(90, 29, 'CONTAJE CELULAR ', 0, ' ', 0, 'activo'),
(91, 29, 'RECUENTO DIFERENCIAL ', 0, ' ', 0, 'activo'),
(92, 30, 'RIVALTA ', 0, ' ', 0, 'activo'),
(93, 30, 'PROTEINAS ', 0, ' ', 0, 'activo'),
(94, 30, 'ENZIMAS ', 0, ' ', 0, 'activo'),
(95, 30, 'GLUCOSA ', 0, ' ', 0, 'activo'),
(96, 35, 'PRUEBA DE EMBARAZO EN ORINA ', 0, ' ', 0, 'activo'),
(97, 36, 'VOLUMEN TOTAL ', 0, ' ', 0, 'activo'),
(98, 36, 'PROTEINAS CUALITATIVAS ', 0, ' ', 0, 'activo'),
(99, 36, 'PROTEINAS CUANTITATIVAS ', 0, 'MG/24H ', 0, 'activo'),
(100, 37, 'VOLUMEN TOTAL ', 0, ' ', 0, 'activo'),
(101, 37, 'CALCIO EN ORINA DE 24 HORAS ', 0, 'GR/24H ', 0, 'activo'),
(102, 38, 'VOLUMEN TOTAL ', 0, ' ', 0, 'activo'),
(103, 38, 'FOSFORO EN ORINA DE 24 HORAS ', 0, 'ML/24H ', 0, 'activo'),
(104, 39, 'ACIDO URICO EN ORINA DE 24 HORAS ', 0, '9MG/24H ', 0, 'activo'),
(105, 40, 'VOLUMEN TOTAL ', 0, ' ', 0, 'activo'),
(106, 40, 'UREA EN ORINA DE 24 HORAS ', 0, 'GR/24H ', 0, 'activo'),
(107, 41, 'VOLUMEN TOTAL ', 0, ' ', 0, 'activo'),
(108, 41, 'SODIO EN ORINA DE 24 HORAS ', 0, 'MEG/24H ', 0, 'activo'),
(109, 42, 'VOLUMEN TOTAL ', 0, ' ', 0, 'activo'),
(110, 42, 'POTASIO EN ORINA DE 24 HORAS ', 0, 'MEG/24 ', 0, 'activo'),
(111, 43, 'VOLUMEN TOTAL ', 0, ' ', 0, 'activo'),
(112, 43, 'CLORO EN ORINA DE 24 HORAS  NIÑOS ', 0, 'MEG/24H ', 0, 'activo'),
(113, 43, 'CLORO EN ORINA DE 24 HORAS  ADULTOS ', 0, 'MEG/24H ', 0, 'activo'),
(114, 44, 'VOLUMEN TOTAL ', 0, ' ', 0, 'activo'),
(115, 44, 'AMILASA ', 0, 'U/HORA ', 0, 'activo'),
(116, 46, 'CELULAS ', 0, ' ', 0, 'activo'),
(117, 46, 'HEMATIES ', 0, ' ', 0, 'activo'),
(118, 46, 'LEUCOCITOS ', 0, ' ', 0, 'activo'),
(119, 46, 'CILINDROS ', 0, ' ', 0, 'activo'),
(120, 46, 'VOLUMEN TOTAL ', 0, ' ', 0, 'activo'),
(121, 48, 'KATO ', 0, ' ', 0, 'activo'),
(122, 48, 'AZUCARES REDUCTORES ', 0, ' ', 0, 'activo'),
(123, 48, 'SUDAN III ', 0, ' ', 0, 'activo'),
(124, 48, 'SANGRE OCULTA ', 0, ' ', 0, 'activo'),
(125, 8, 'SALMONELLA THYPOID H= ', 0, ' ', 0, 'activo'),
(126, 8, 'REACCION DE WIDAL SALMONELLA THYPOID 0= ', 0, ' ', 0, 'activo'),
(127, 8, 'SALMONELLA PARA THYPOID B= ', 0, ' ', 0, 'activo'),
(128, 8, 'SALMONELLA PARA THYPOID A= ', 0, ' ', 0, 'activo'),
(129, 39, 'VOLUMEN TOTAL2', 0, '', 0, 'activo'),
(130, 9, 'LDL COLESTEROL                                                                  ', 0, 'mg/dl               ', 0, 'activo'),
(131, 9, 'TRIGLICERIDOS                                                                   ', 0, 'mg/dl               ', 0, 'activo'),
(132, 13, 'GLUCOSA EN AYUNAS                                                               ', 0, 'mg/dl               ', 0, 'activo'),
(133, 13, 'GLUCOSA SEGUNDA HORA                                                            ', 0, 'mg/dl               ', 0, 'activo'),
(134, 34, 'CREATININA EN SANGRE                                                            ', 0, 'mg/dl               ', 0, 'activo'),
(135, 34, 'DEPURACION                                                                      ', 0, 'ml/24H              ', 0, 'activo'),
(136, 34, 'VOLUMEN MINUTO                                                                  ', 0, 'ml/Min              ', 0, 'activo'),
(137, 34, 'VOLUMEN TOTAL                                                                   ', 0, 'ml                  ', 0, 'activo'),
(138, 58, 'UREA                                                                            ', 0, 'mg/dl               ', 0, 'activo'),
(139, 57, 'CREATININA                                                                      ', 0, 'mg/dl               ', 0, 'activo'),
(140, 55, 'CALCIO SERICO                                                                   ', 0, 'mg/dl               ', 0, 'activo'),
(141, 54, 'LDH                                                                             ', 0, 'U/I                 ', 0, 'activo'),
(142, 51, 'BILIRRUBINA TOTAL                                                               ', 0, 'mg/dl               ', 0, 'activo'),
(143, 52, 'BILIRRUBINA DIRECTA                                                             ', 0, 'mg/dl               ', 0, 'activo'),
(144, 53, 'BILIRRUBINA INDIRECTA                                                           ', 0, 'mg/dl               ', 0, 'activo'),
(145, 47, 'ASPECTO                                                                         ', 1, '                    ', 0, 'activo'),
(146, 47, 'COLOR                                                                           ', 2, '                    ', 0, 'activo'),
(147, 47, 'REACCION                                                                        ', 5, '                    ', 0, 'activo'),
(148, 47, 'MOCO                                                                            ', 6, '                    ', 0, 'activo'),
(149, 47, 'SANGRE                                                                          ', 7, '                    ', 0, 'activo'),
(150, 47, 'EXAMEN MICROSCOPICO                                                             ', 9, '                    ', 0, 'activo'),
(151, 49, 'TGO                                                                             ', 0, 'U/L                 ', 0, 'activo'),
(152, 50, 'TGP                                                                             ', 0, 'U/L                 ', 0, 'activo'),
(153, 31, 'ASPECTO                                                                         ', 2, '                    ', 0, 'activo'),
(154, 31, 'OLOR                                                                            ', 4, '                    ', 0, 'activo'),
(155, 32, 'PROTEINAS                                                                       ', 2, '                    ', 0, 'activo'),
(156, 32, 'GLUCOSA                                                                         ', 1, '                    ', 0, 'activo'),
(157, 32, 'BILIRRUBINA                                                                     ', 3, '                    ', 0, 'activo'),
(158, 32, 'UROBILINOGENO                                                                   ', 4, '                    ', 0, 'activo'),
(159, 32, 'CETONA                                                                          ', 5, '                    ', 0, 'activo'),
(160, 32, 'NITRITOS                                                                        ', 6, '                    ', 0, 'activo'),
(161, 32, 'SANGRE                                                                          ', 7, '                    ', 0, 'activo'),
(162, 47, 'OLOR', 4, '', 0, 'activo'),
(163, 31, 'REACCION O PH', 6, '', 0, 'activo'),
(164, 31, 'DENSIDAD', 5, '', 0, 'activo'),
(165, 32, 'LEUCOCITOS', 8, '', 0, 'activo'),
(166, 6, 'CALCIO', 1, 'mg/dl', 0, 'activo'),
(167, 6, 'POTASIO', 2, 'mEq/L', 0, 'activo'),
(168, 6, 'SODIO', 3, 'mEq/L', 0, 'activo'),
(169, 6, 'MAGNESIO', 4, 'mg/dl', 0, 'activo'),
(170, 6, 'FOSFORO ADULTO', 6, 'mg/dl', 0, 'activo'),
(171, 6, 'FOSFORO NIÑOS', 7, 'mg/dl', 0, 'activo'),
(172, 6, 'CLORO', 8, 'mEq/L', 0, 'activo'),
(173, 8, 'VDRL (Cuantitativo)', 3, '', 0, 'activo'),
(174, 8, 'CELULA LE', 0, '', 0, 'activo'),
(175, 56, 'ACIDO URICO', 6, 'mg/dl', 0, 'activo'),
(176, 31, 'CANTIDAD', 1, 'ml', 0, 'activo'),
(177, 47, 'ALMIDON INDIGERIDO', 12, '', 0, 'activo'),
(178, 47, 'RESTOS ALIMENTICIOS', 8, '', 0, 'activo'),
(179, 47, 'LEUCOCITOS', 14, '', 0, 'activo'),
(180, 47, 'HEMATIES', 15, '', 0, 'activo'),
(181, 47, 'CONSISTENCIA', 3, '', 0, 'activo'),
(182, 47, 'GLOBULOS DE GRASA', 13, '', 0, 'activo'),
(183, 47, 'LEVADURAS', 11, '', 0, 'activo'),
(184, 8, 'V.D.R.L. (Cualitativo)', 2, '', 0, 'activo'),
(185, 8, 'MONOTEST', 6, '', 0, 'activo'),
(186, 8, 'ANTIESTREPTOLISINA \"O\"', 8, '', 0, 'activo'),
(187, 5, 'COLESTEROL TOTAL', 1, 'mg/dl', 0, 'activo'),
(188, 5, 'TRIGLICERIDOS', 2, 'mg/dl', 0, 'activo'),
(189, 5, 'H.D.L. COLESTEROL', 3, 'mg/dl', 0, 'activo'),
(190, 5, 'L.D.L. COLESTEROL', 5, 'mg/dl', 0, 'activo'),
(191, 2, 'GLICEMIA BASAL', 1, 'mg/dl', 0, 'activo'),
(192, 2, 'UREA', 3, 'mg/dl', 0, 'activo'),
(193, 2, 'CREATININA SERICA', 4, 'mg/dl', 0, 'activo'),
(194, 2, 'TRIGLICERIDOS', 6, 'mg/dl', 0, 'activo'),
(195, 2, 'ACIDO URICO', 7, 'mg/dl', 0, 'activo'),
(196, 2, 'TGO', 8, 'U/L', 0, 'activo'),
(197, 2, 'TGP', 9, 'U/L', 0, 'activo'),
(198, 2, 'BILIRRUBINA TOTAL', 10, 'mg/dl', 0, 'activo'),
(199, 2, 'BILIRRUBINA DIRECTA', 11, 'mg/dl', 0, 'activo'),
(200, 2, 'BILIRRUBINA INDIRECTA', 12, 'mg/dl', 0, 'activo'),
(201, 2, 'PROTEINAS TOTALES', 13, 'g/dl', 0, 'activo'),
(202, 2, 'ALBUMINA', 14, 'g/dl', 0, 'activo'),
(203, 2, 'GLOBULINA', 15, 'g/dl', 0, 'activo'),
(204, 2, 'GGT', 17, 'U/l', 0, 'activo'),
(205, 2, 'LDH', 16, 'U/l', 0, 'activo'),
(206, 2, 'FOSF. ALCALINA', 18, 'U/l', 0, 'activo'),
(207, 2, 'FOSFORO', 19, 'mg/dl', 0, 'activo'),
(208, 2, 'CALCIO', 21, 'mg/dl', 0, 'activo'),
(209, 2, 'AMILASA', 22, 'U/L', 0, 'activo'),
(210, 2, 'COLESTEROL', 5, 'mg/dl', 0, 'activo'),
(211, 2, 'TROPONINA I', 23, 'ng/mL', 0, 'activo'),
(212, 14, 'LH FASE FOLICULAR', 0, 'mUl/ml', 0, 'activo'),
(213, 14, 'LH FASE OVULATORIA', 0, 'mUl/ml', 0, 'activo'),
(214, 14, 'LH HOMBRE', 0, 'mUl/ml', 0, 'activo'),
(215, 14, 'LH POSTMENOPAUSICA', 0, 'mUl/ml', 0, 'activo'),
(216, 14, 'FSH FASE FOLICULAR', 0, 'mlU/mL', 0, 'activo'),
(217, 14, 'FSH CICLO MEDIO', 0, 'mlU/mL', 0, 'activo'),
(218, 14, 'FSH HOMBRE', 0, 'mlU/mL', 0, 'activo'),
(219, 14, 'FSH FASE LUTEA', 0, 'mlU/mL', 0, 'activo'),
(220, 14, 'FSH POSTMENOPAUSICA', 0, 'mlU/mL', 0, 'activo'),
(221, 14, 'LH FASE LUTEAL', 0, 'mUl/ml', 0, 'activo'),
(222, 14, 'PROGESTERONA EMBARAZADA 2DO TRIMESTRE', 0, 'ng/ml', 0, 'activo'),
(223, 14, 'PROGESTERONA FASE FOLICULAR', 0, 'ng/ml', 0, 'activo'),
(224, 14, 'PROGESTERONA FASE LUTEA MEDIA', 0, 'ng/ml', 0, 'activo'),
(225, 14, 'PROGESTERONA MASCULINO', 0, 'ng/ml', 0, 'activo'),
(226, 14, 'PROGESTERONA POSMENOPAUSICA', 0, 'ng/ml', 0, 'activo'),
(227, 14, 'PROLACTINA HOMBRE', 0, 'ng/mL', 0, 'activo'),
(228, 14, 'PROLACTINA  CICLO MESTRUAL', 0, 'ng/mL', 0, 'activo'),
(229, 14, 'PROLACTINA FASE MENOPAUSICA', 0, 'ng/mL', 0, 'activo'),
(230, 14, 'PSA TOTAL', 0, 'ng/mL', 0, 'activo'),
(231, 14, 'FERRITINA MUJER', 0, 'ng/mL', 0, 'activo'),
(232, 14, 'TROPONINA I', 0, 'ng/mL', 0, 'activo'),
(233, 14, 'TSH', 0, 'uUl/Ml', 0, 'activo'),
(234, 14, 'PROGESTERONA EMBARAZADA 1ER TRIMESTRE', 0, 'ng/ml', 0, 'activo'),
(235, 14, 'HEPATITIS C', 0, 'COI', 0, 'activo'),
(236, 14, 'T3 TOTAL ADULTO', 0, 'ng/ml', 0, 'activo'),
(237, 14, 'T3 TOTAL NIÑO DE 1 - 10 AÑOS', 0, 'ng/ml', 0, 'activo'),
(238, 14, 'T3 TOTAL (11 - 15 AÑOS)', 0, 'ng/ml', 0, 'activo'),
(239, 14, 'T3 TOTAL ( 16 - 17 )', 0, 'ng/ml', 0, 'activo'),
(240, 14, 'T4 TOTAL', 0, 'nmol/L', 0, 'activo'),
(241, 14, 'INMUNOSEROLOGIA', 30, 'mg/L', 0, 'activo'),
(242, 14, 'FERRITINA HOMBRE', 0, 'ng/mL', 0, 'activo'),
(243, 34, 'CREATININA EN ORINA', 0, 'mg/24H', 0, 'activo'),
(244, 4, 'INR', 5, '', 0, 'activo'),
(245, 33, 'ESPERMATOZOIDES', 11, '', 0, 'activo'),
(246, 33, 'CELULAS EPITELIALES', 1, '', 0, 'activo'),
(247, 33, 'BACTERIAS', 2, '', 0, 'activo'),
(248, 33, 'MUCINA', 3, '', 0, 'activo'),
(249, 33, 'CRISTALES DE URATOS AMORFOS', 6, '', 0, 'activo'),
(250, 33, 'CRISTALES DE FOSFATOS AMORFOS', 7, '', 0, 'activo'),
(251, 1, '1231123', 0, '123', 0, 'inactivo'),
(252, 1, 'HEMOGLOBINA MUJERES', 2, 'g/dl', 0, 'activo'),
(253, 1, 'HEMOGLOBINA NIÑOS', 3, 'g/dl', 0, 'activo'),
(254, 1, 'HEMATOCRITO HOMBRES', 4, '%', 0, 'activo'),
(255, 1, 'HEMATOCRITO MUJERES', 5, '%', 0, 'activo'),
(256, 1, 'HEMATOCRITO NIÑOS', 6, '%', 0, 'activo'),
(257, 1, 'LEUCOCITOS ADULTOS', 7, 'mm3', 0, 'activo'),
(258, 1, 'LEUCOCITOS NIÑOS', 8, 'mm3', 0, 'activo'),
(259, 1, 'FORMULA LEUCOCITARIA', 9, '%', 0, 'activo'),
(260, 1, 'NEUTROFILOS', 10, '%', 0, 'activo'),
(261, 1, 'LINFOCITOS', 11, '%', 0, 'activo'),
(262, 1, 'EOSINOFILOS', 12, '%', 0, 'activo'),
(263, 1, 'MONOCITOS', 13, '%', 0, 'activo'),
(264, 1, 'BASOFILOS', 14, '%', 0, 'activo'),
(265, 1, 'PLAQUETAS', 15, 'mm3', 0, 'activo'),
(266, 33, 'CILINDRO LEUCOCITARIO', 14, '', 0, 'activo'),
(267, 33, 'CILINDRO HIALINO', 13, '', 0, 'activo'),
(268, 33, 'CILINDRO GRANULOSO', 15, '', 0, 'activo'),
(269, 45, 'PROTEINA DE BENCE - JONES', 0, '', 0, 'activo'),
(270, 60, 'GLOBULINA', 3, 'g/dl', 0, 'activo'),
(271, 60, 'ALBUMINA', 2, 'g/dl', 0, 'activo'),
(272, 60, 'PROTEINAS TOTALES', 1, 'g/dl', 0, 'activo'),
(273, 60, 'RLCION ALB/GLOB', 4, '', 0, 'activo'),
(274, 61, 'HEMOGLOBINA', 1, 'g/dl', 0, 'activo'),
(275, 61, 'HEMATOCRITO', 2, '%', 0, 'activo'),
(276, 61, 'LEUCOCITOS', 3, 'mm3', 0, 'activo'),
(277, 61, 'PLAQUETAS', 5, 'mm3', 0, 'activo'),
(278, 62, 'BILIRRUBINA DIRECTA', 1, 'mg/dl', 0, 'activo'),
(279, 62, 'BILIRRUBINA INDIRECTA', 2, 'mg/dl', 0, 'activo'),
(280, 62, 'BILIRRUBINA TOTAL', 3, 'mg/dl', 0, 'activo'),
(281, 33, 'ACUMULOS LEUCOCITARIOS', 6, '', 0, 'activo'),
(282, 31, 'COLOR', 3, '', 0, 'activo'),
(283, 33, 'LEUCOCITOS', 4, '', 0, 'activo'),
(284, 33, 'HEMATIES', 5, '', 0, 'activo'),
(285, 33, 'CRISTALES DE OXALATO DE CALCIO', 8, '', 0, 'activo'),
(286, 33, 'CRISTALES DE ACIDO URICO', 9, '', 0, 'activo'),
(287, 33, 'LEVADURAS', 10, '', 0, 'activo'),
(288, 2, 'MAGNESIO', 24, 'mg/dl', 0, 'activo'),
(289, 2, 'HIERRO', 25, 'ng/dl', 0, 'activo'),
(290, 68, 'LH', 0, 'mUI/ml', 0, 'activo'),
(291, 69, 'HEPATITIS C', 0, 'COI', 0, 'activo'),
(292, 8, 'H.I.V.', 1, '', 0, 'activo'),
(293, 64, 'CALCIO IONICO', 0, 'mg/dl', 0, 'activo'),
(294, 71, 'TROPONINA I CUALITATIVA', 0, '', 0, 'activo'),
(295, 66, 'PROGESTERONA', 0, 'ng/ml', 0, 'activo'),
(296, 33, 'CELULAS RENALES', 16, '', 0, 'activo'),
(297, 33, 'CRISTALES DE FOSFATO AMONIACO', 17, '', 0, 'activo'),
(298, 63, 'GRUPO SANGUINEO', 1, '', 0, 'activo'),
(299, 63, 'FACTOR RH', 2, '', 0, 'activo'),
(300, 47, 'HECES SERIADAS', 0, '', 0, 'activo'),
(301, 59, 'PROLACTINA', 0, 'mg/dl', 0, 'activo'),
(302, 67, 'FSH                                                                                                                                                   ', 0, 'mUI/ml              ', 0, 'activo'),
(303, 14, 'TESTOSTERONA TOTAL                                                                                                                                    ', 0, 'ng/ml               ', 0, 'activo'),
(304, 33, 'LEVADURAS Y PSEUDOHIFAS', 19, '', 0, 'activo'),
(305, 33, 'CELULAS DE TRANSCISION', 18, '', 0, 'activo'),
(306, 47, 'FLORA BACTERIANA', 10, '', 0, 'activo'),
(307, 61, 'FORMULA LEUCOCITARIA', 4, '%', 0, 'activo'),
(308, 2, 'GLICEMIA POSTPRANDIAL', 2, 'mg/dl', 0, 'activo'),
(309, 1, 'RETICULOCITOS ADULTOS', 32, '%', 0, 'activo'),
(310, 1, 'FROTIS DE SANGRE PERIFERICA', 33, '4', 0, 'activo'),
(311, 1, 'RBC', 16, '10^6/uL', 0, 'activo'),
(312, 1, 'MCV', 17, 'fL', 0, 'activo'),
(313, 1, 'MCH', 18, 'Pg', 0, 'activo'),
(314, 1, 'MCHC', 19, 'g/dL', 0, 'activo'),
(315, 1, 'TIEMPOS DE COAGULACION', 31, '56', 0, 'activo'),
(316, 1, 'CAYADO', 22, '%', 0, 'activo'),
(317, 1, 'ERITROBLASTOS', 23, '%', 0, 'activo'),
(318, 1, 'MIELOBLASTO', 24, '%', 0, 'activo'),
(319, 1, 'CELULAS INMADURAS', 25, '%', 0, 'activo'),
(320, 1, 'PROMIELOBLASTO', 26, '%', 0, 'activo'),
(321, 1, 'T.P. (CONTROL)', 27, 'Seg.', 0, 'activo'),
(322, 1, 'T.P (PACIENTE)', 28, 'Seg.', 0, 'activo'),
(323, 1, 'T.P.T. (PACIENTE)', 30, 'Seg.', 0, 'activo'),
(324, 1, 'T.P.T. (CONTROL)', 29, 'Seg.', 0, 'activo'),
(325, 1, 'RDW-CV', 20, '%', 0, 'activo'),
(326, 1, 'RDW-SD', 21, 'fL', 0, 'activo'),
(327, 5, 'VLDL', 6, 'mg/dl', 0, 'activo'),
(328, 8, 'PROTEINA C REACTIVA cualitativa', 4, '', 0, 'activo'),
(329, 8, 'RA- TEST', 9, '', 0, 'activo'),
(330, 8, 'PRUEBA DE EMBARAZO EN SANGRE (BHCG)', 7, '', 0, 'activo'),
(331, 47, 'SANGRE OCULTA EN HECES', 16, '', 0, 'activo'),
(332, 14, 'T3 LIBRE', 0, 'pg/ml', 0, 'activo'),
(333, 14, 'T4 LIBRE', 0, 'pmol/L', 0, 'activo'),
(334, 14, 'TSH (ELISA)', 0, 'uIU/ml', 0, 'activo'),
(335, 14, 'PSA LIBRE', 0, 'ng/mL', 0, 'activo'),
(336, 65, 'ESTRADIOL (ESTROGENO)', 0, 'pg/mL', 0, 'activo'),
(337, 70, 'HEMOGLOBINA GLICOSILADA', 0, '%', 0, 'activo'),
(338, 1, 'VSG', 34, 'x mm3', 0, 'activo'),
(339, 14, 'PROLACTINA EN NIÑOS', 31, 'ng/ml', 0, 'activo'),
(340, 2, 'FOSFORO EN NIÑOS', 26, 'mg/dl', 0, 'activo'),
(341, 4, 'T.P (C)', 1, 'Seg.', 0, 'activo'),
(342, 4, 'T.P (P)', 1, 'Seg.', 0, 'activo'),
(343, 4, 'T.P.T (C)', 2, 'Seg.', 0, 'activo'),
(344, 4, 'T.P.T (P)', 2, 'Seg.', 0, 'activo'),
(345, 8, 'PROTEINA C REACTIVA Cuantitativa', 5, 'mg/L', 0, 'activo'),
(346, 82, 'das', 0, 'ads', 0, 'inactivo'),
(347, 82, 'asd', 0, 'asd', 0, 'inactivo'),
(348, 83, 'fas', 2, '12', 0, 'activo'),
(349, 84, 'fas', 2, '12', 0, 'activo'),
(350, 97, 'globulos', 1, 'ml', 1, 'activo'),
(351, 99, 'caracteristica', 1, 'gr', 1, 'activo'),
(352, 100, 'caracteristica', 1, 'gr', 1, 'activo'),
(353, 101, 'fas', 1, 'rango', 1, 'activo'),
(354, 102, 'hemoglobina', 1, 'gr/dl', 1, 'activo'),
(355, 102, 'Leucocitos', 3, 'l/mm3', 1, 'activo'),
(356, 102, 'Color', 4, '', 1, 'activo'),
(357, 102, 'Formula Leucocitaria', 2, '%/seg', 1, 'activo'),
(358, 103, 'Hemoglobina', 1, 'g/dl', 1, 'activo'),
(359, 104, 'aaaa', 0, '', 1, 'activo'),
(360, 105, 'dd', 1, 'gr/dl', 1, 'activo'),
(361, 106, 'rr', 0, '', 1, 'activo'),
(362, 107, 'Hemoglobina', 1, 'g/dl', 1, 'activo'),
(363, 107, 'leucocitos', 4, 'g/mm3', 1, 'activo'),
(364, 107, 'color', 3, '', 1, 'activo'),
(365, 107, 'Formula Leucocitaria', 2, '$/seg', 1, 'activo'),
(366, 108, 'PPP', 0, '', 1, 'activo'),
(367, 109, 'LLM', 0, '', 1, 'activo');

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
  `inferior` decimal(8,2) NOT NULL,
  `superior` decimal(8,2) NOT NULL,
  `resultado` mediumtext NOT NULL,
  `nota` varchar(80) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `detalles_examenes_paciente`
--

INSERT INTO `detalles_examenes_paciente` (`id`, `id_dt`, `id_ex`, `id_ex_pac`, `id_rango`, `inferior`, `superior`, `resultado`, `nota`) VALUES
(1, 362, 107, 5, 12, 0.00, 0.00, 'rojo', ''),
(2, 365, 107, 5, 0, 0.00, 0.00, 'rojo', ''),
(3, 364, 107, 5, 0, 0.00, 0.00, 'rojo', ''),
(4, 363, 107, 5, 16, 0.00, 0.00, 'rojo', ''),
(5, 358, 103, 6, 0, 0.00, 0.00, 'rojo', ''),
(6, 362, 107, 7, 12, 0.00, 0.00, 'rojo', ''),
(7, 365, 107, 7, 0, 0.00, 0.00, 'rojo', ''),
(8, 364, 107, 7, 0, 0.00, 0.00, 'rojo', ''),
(9, 363, 107, 7, 16, 0.00, 0.00, 'rojo', ''),
(10, 358, 103, 8, 0, 0.00, 0.00, 'rojo', ''),
(11, 362, 107, 9, 12, 0.00, 0.00, 'rojo', ''),
(12, 365, 107, 9, 0, 0.00, 0.00, 'rojo', ''),
(13, 364, 107, 9, 0, 0.00, 0.00, 'rojo', ''),
(14, 363, 107, 9, 16, 0.00, 0.00, 'rojo', ''),
(15, 362, 107, 10, 12, 0.00, 0.00, 'rojo', ''),
(16, 365, 107, 10, 0, 0.00, 0.00, 'rojo', ''),
(17, 364, 107, 10, 0, 0.00, 0.00, 'rojo', ''),
(18, 363, 107, 10, 16, 0.00, 0.00, 'rojo', ''),
(19, 362, 107, 11, 12, 0.00, 0.00, 'rojo', ''),
(20, 365, 107, 11, 0, 0.00, 0.00, 'rojo', ''),
(21, 364, 107, 11, 0, 0.00, 0.00, 'rojo', ''),
(22, 363, 107, 11, 16, 0.00, 0.00, 'rojo', ''),
(23, 362, 107, 12, 12, 0.00, 0.00, 'rojo', ''),
(24, 365, 107, 12, 0, 0.00, 0.00, 'rojo', ''),
(25, 364, 107, 12, 0, 0.00, 0.00, 'rojo', ''),
(26, 363, 107, 12, 16, 0.00, 0.00, 'rojo', ''),
(27, 362, 107, 13, 12, 0.00, 0.00, 'rojo', ''),
(28, 365, 107, 13, 0, 0.00, 0.00, 'rojo', ''),
(29, 364, 107, 13, 0, 0.00, 0.00, 'rojo', ''),
(30, 363, 107, 13, 16, 0.00, 0.00, 'rojo', ''),
(31, 362, 107, 14, 12, 0.00, 0.00, 'rojo', ''),
(32, 365, 107, 14, 0, 0.00, 0.00, 'rojo', ''),
(33, 364, 107, 14, 0, 0.00, 0.00, 'rojo', ''),
(34, 363, 107, 14, 16, 0.00, 0.00, 'rojo', ''),
(35, 362, 107, 15, 12, 0.00, 0.00, 'rojo', ''),
(36, 365, 107, 15, 0, 0.00, 0.00, 'rojo', ''),
(37, 364, 107, 15, 0, 0.00, 0.00, 'rojo', ''),
(38, 363, 107, 15, 16, 0.00, 0.00, 'rojo', ''),
(39, 362, 107, 16, 12, 0.00, 0.00, 'rojo', ''),
(40, 365, 107, 16, 0, 0.00, 0.00, 'rojo', ''),
(41, 364, 107, 16, 0, 0.00, 0.00, 'rojo', ''),
(42, 363, 107, 16, 16, 0.00, 0.00, 'rojo', ''),
(43, 362, 107, 17, 12, 0.00, 0.00, 'rojo', ''),
(44, 365, 107, 17, 0, 0.00, 0.00, 'rojo', ''),
(45, 364, 107, 17, 0, 0.00, 0.00, 'rojo', ''),
(46, 363, 107, 17, 16, 0.00, 0.00, 'rojo', ''),
(47, 362, 107, 18, 12, 0.00, 0.00, 'rojo', ''),
(48, 365, 107, 18, 0, 0.00, 0.00, 'rojo', ''),
(49, 364, 107, 18, 0, 0.00, 0.00, 'rojo', ''),
(50, 363, 107, 18, 16, 0.00, 0.00, 'rojo', ''),
(51, 362, 107, 19, 12, 0.00, 0.00, 'rojo', ''),
(52, 365, 107, 19, 0, 0.00, 0.00, 'rojo', ''),
(53, 364, 107, 19, 0, 0.00, 0.00, 'rojo', ''),
(54, 363, 107, 19, 16, 0.00, 0.00, 'rojo', ''),
(55, 362, 107, 20, 12, 0.00, 0.00, 'rojo', ''),
(56, 365, 107, 20, 0, 0.00, 0.00, 'rojo', ''),
(57, 364, 107, 20, 0, 0.00, 0.00, 'rojo', ''),
(58, 363, 107, 20, 16, 0.00, 0.00, 'rojo', ''),
(59, 362, 107, 21, 12, 0.00, 0.00, 'rojo', ''),
(60, 365, 107, 21, 0, 0.00, 0.00, 'rojo', ''),
(61, 364, 107, 21, 0, 0.00, 0.00, 'rojo', ''),
(62, 363, 107, 21, 16, 0.00, 0.00, 'rojo', ''),
(63, 362, 107, 22, 12, 0.00, 0.00, 'rojo', ''),
(64, 365, 107, 22, 0, 0.00, 0.00, 'rojo', ''),
(65, 364, 107, 22, 0, 0.00, 0.00, 'rojo', ''),
(66, 363, 107, 22, 16, 0.00, 0.00, 'rojo', ''),
(67, 362, 107, 23, 12, 0.00, 0.00, 'rojo', ''),
(68, 365, 107, 23, 0, 0.00, 0.00, 'rojo', ''),
(69, 364, 107, 23, 0, 0.00, 0.00, 'rojo', ''),
(70, 363, 107, 23, 16, 0.00, 0.00, 'rojo', ''),
(71, 362, 107, 24, 12, 0.00, 0.00, 'rojo', ''),
(72, 365, 107, 24, 0, 0.00, 0.00, 'rojo', ''),
(73, 364, 107, 24, 0, 0.00, 0.00, 'rojo', ''),
(74, 363, 107, 24, 16, 0.00, 0.00, 'rojo', ''),
(75, 362, 107, 25, 12, 0.00, 0.00, 'rojo', ''),
(76, 365, 107, 25, 0, 0.00, 0.00, 'rojo', ''),
(77, 364, 107, 25, 0, 0.00, 0.00, 'rojo', ''),
(78, 363, 107, 25, 16, 0.00, 0.00, 'rojo', ''),
(79, 362, 107, 26, 12, 0.00, 0.00, 'rojo', ''),
(80, 365, 107, 26, 0, 0.00, 0.00, 'rojo', ''),
(81, 364, 107, 26, 0, 0.00, 0.00, 'rojo', ''),
(82, 363, 107, 26, 16, 0.00, 0.00, 'rojo', ''),
(83, 362, 107, 27, 12, 0.00, 0.00, 'rojo', ''),
(84, 365, 107, 27, 0, 0.00, 0.00, 'rojo', ''),
(85, 364, 107, 27, 0, 0.00, 0.00, 'rojo', ''),
(86, 363, 107, 27, 16, 0.00, 0.00, 'rojo', ''),
(87, 362, 107, 28, 12, 0.00, 0.00, 'rojo', ''),
(88, 365, 107, 28, 0, 0.00, 0.00, 'rojo', ''),
(89, 364, 107, 28, 0, 0.00, 0.00, 'rojo', ''),
(90, 363, 107, 28, 16, 0.00, 0.00, 'rojo', ''),
(91, 362, 107, 29, 12, 0.00, 0.00, 'rojo', ''),
(92, 365, 107, 29, 0, 0.00, 0.00, 'rojo', ''),
(93, 364, 107, 29, 0, 0.00, 0.00, 'rojo', ''),
(94, 363, 107, 29, 16, 0.00, 0.00, 'rojo', ''),
(95, 362, 107, 30, 12, 0.00, 0.00, 'rojo', ''),
(96, 365, 107, 30, 0, 0.00, 0.00, 'rojo', ''),
(97, 364, 107, 30, 0, 0.00, 0.00, 'rojo', ''),
(98, 363, 107, 30, 16, 0.00, 0.00, 'rojo', ''),
(99, 362, 107, 31, 12, 0.00, 0.00, 'rojo', ''),
(100, 365, 107, 31, 0, 0.00, 0.00, 'rojo', ''),
(101, 364, 107, 31, 0, 0.00, 0.00, 'rojo', ''),
(102, 363, 107, 31, 16, 0.00, 0.00, 'rojo', ''),
(103, 362, 107, 32, 12, 0.00, 0.00, 'rojo', ''),
(104, 365, 107, 32, 0, 0.00, 0.00, 'rojo', ''),
(105, 364, 107, 32, 0, 0.00, 0.00, 'rojo', ''),
(106, 363, 107, 32, 16, 0.00, 0.00, 'rojo', ''),
(107, 362, 107, 33, 12, 0.00, 0.00, 'rojo', ''),
(108, 365, 107, 33, 0, 0.00, 0.00, 'rojo', ''),
(109, 364, 107, 33, 0, 0.00, 0.00, 'rojo', ''),
(110, 363, 107, 33, 16, 0.00, 0.00, 'rojo', ''),
(111, 362, 107, 34, 12, 0.00, 0.00, 'rojo', ''),
(112, 365, 107, 34, 0, 0.00, 0.00, 'rojo', ''),
(113, 364, 107, 34, 0, 0.00, 0.00, 'rojo', ''),
(114, 363, 107, 34, 16, 0.00, 0.00, 'rojo', ''),
(115, 362, 107, 35, 12, 0.00, 0.00, 'rojo', ''),
(116, 365, 107, 35, 0, 0.00, 0.00, 'rojo', ''),
(117, 364, 107, 35, 0, 0.00, 0.00, 'rojo', ''),
(118, 363, 107, 35, 16, 0.00, 0.00, 'rojo', ''),
(119, 362, 107, 36, 12, 0.00, 0.00, 'rojo', ''),
(120, 365, 107, 36, 0, 0.00, 0.00, 'rojo', ''),
(121, 364, 107, 36, 0, 0.00, 0.00, 'rojo', ''),
(122, 363, 107, 36, 16, 0.00, 0.00, 'rojo', ''),
(123, 362, 107, 37, 12, 0.00, 0.00, 'rojo', ''),
(124, 365, 107, 37, 0, 0.00, 0.00, 'rojo', ''),
(125, 364, 107, 37, 0, 0.00, 0.00, 'rojo', ''),
(126, 363, 107, 37, 16, 0.00, 0.00, 'rojo', ''),
(127, 362, 107, 38, 12, 0.00, 0.00, 'rojo', ''),
(128, 365, 107, 38, 0, 0.00, 0.00, 'rojo', ''),
(129, 364, 107, 38, 0, 0.00, 0.00, 'rojo', ''),
(130, 363, 107, 38, 16, 0.00, 0.00, 'rojo', ''),
(131, 362, 107, 39, 12, 0.00, 0.00, '12', '5'),
(132, 365, 107, 39, 0, 0.00, 0.00, 'SubCaracteristica', '340'),
(133, 364, 107, 39, 0, 0.00, 0.00, 'verde', '3'),
(134, 363, 107, 39, 16, 0.00, 0.00, '354', '44'),
(135, 362, 107, 40, 12, 0.00, 0.00, '1', '24'),
(136, 365, 107, 40, 0, 0.00, 0.00, 'subCaracteristica', '3'),
(137, 364, 107, 40, 0, 0.00, 0.00, 'verde', '15'),
(138, 363, 107, 40, 16, 0.00, 0.00, '3', '4'),
(139, 362, 107, 41, 12, 9.00, 15.00, '', ''),
(140, 365, 107, 41, 0, 0.00, 0.00, 'subCaracteristica', ''),
(141, 364, 107, 41, 0, 0.00, 0.00, 'amarillo', ''),
(142, 363, 107, 41, 16, 15.00, 18.00, '', ''),
(143, 358, 103, 42, 0, 0.00, 0.00, '', '');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detalles_ex_pendientes`
--

CREATE TABLE `detalles_ex_pendientes` (
  `id` int(11) NOT NULL,
  `id_dt` int(11) NOT NULL,
  `id_ex` int(11) NOT NULL,
  `id_ex_pd` int(11) NOT NULL,
  `id_rango` int(11) NOT NULL,
  `inferior` decimal(8,2) NOT NULL,
  `superior` decimal(8,2) NOT NULL,
  `resultado` mediumtext NOT NULL,
  `nota` varchar(80) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `detalles_ex_pendientes`
--

INSERT INTO `detalles_ex_pendientes` (`id`, `id_dt`, `id_ex`, `id_ex_pd`, `id_rango`, `inferior`, `superior`, `resultado`, `nota`) VALUES
(1, 362, 107, 1, 12, 0.00, 0.00, '', ''),
(2, 365, 107, 1, 0, 0.00, 0.00, 'subCaracteristica', ''),
(3, 364, 107, 1, 0, 0.00, 0.00, 'amarillo', ''),
(4, 363, 107, 1, 16, 0.00, 0.00, '', ''),
(9, 362, 107, 6, 12, 9.00, 15.00, '', ''),
(10, 365, 107, 6, 0, 0.00, 0.00, 'subCaracteristica', ''),
(11, 364, 107, 6, 0, 0.00, 0.00, 'amarillo', ''),
(12, 363, 107, 6, 16, 15.00, 18.00, '', '');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detalle_subcaracteristica_paciente`
--

CREATE TABLE `detalle_subcaracteristica_paciente` (
  `id` int(11) NOT NULL,
  `id_det_ex` int(11) NOT NULL,
  `id_detalle_sub` int(11) NOT NULL,
  `resultado` varchar(80) NOT NULL,
  `nota` varchar(80) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `detalle_subcaracteristica_paciente`
--

INSERT INTO `detalle_subcaracteristica_paciente` (`id`, `id_det_ex`, `id_detalle_sub`, `resultado`, `nota`) VALUES
(1, 7, 16, '4', '5'),
(2, 7, 17, '6', '7'),
(3, 7, 18, '8', '9'),
(4, 7, 19, '10', '11'),
(5, 7, 20, '13', '12'),
(6, 12, 16, '4', '6'),
(7, 12, 17, '7', '8'),
(8, 12, 18, '9', '01'),
(9, 12, 19, '11', '12'),
(10, 12, 20, '14.11111111111111', '13'),
(11, 16, 16, '4', '6'),
(12, 16, 17, '7', '8'),
(13, 16, 18, '9', '01'),
(14, 16, 19, '11', '12'),
(15, 16, 20, '14.11111111111111', '13'),
(16, 20, 16, '4', '5'),
(17, 20, 17, '6', '7'),
(18, 20, 18, '8', '9'),
(19, 20, 19, '10', '11'),
(20, 20, 20, '13', '12'),
(21, 24, 16, '4', '5'),
(22, 24, 17, '6', '7'),
(23, 24, 18, '8', '9'),
(24, 24, 19, '10', '11'),
(25, 24, 20, '13', '12'),
(26, 28, 16, '', ''),
(27, 28, 17, '', ''),
(28, 28, 18, '', ''),
(29, 28, 19, '', ''),
(30, 28, 20, '', ''),
(31, 32, 16, '', ''),
(32, 32, 17, '', ''),
(33, 32, 18, '', ''),
(34, 32, 19, '', ''),
(35, 32, 20, '', ''),
(36, 36, 16, '', ''),
(37, 36, 17, '', ''),
(38, 36, 18, '', ''),
(39, 36, 19, '', ''),
(40, 36, 20, '', ''),
(41, 40, 16, '', ''),
(42, 40, 17, '', ''),
(43, 40, 18, '', ''),
(44, 40, 19, '', ''),
(45, 40, 20, '', ''),
(46, 44, 16, '', ''),
(47, 44, 17, '', ''),
(48, 44, 18, '', ''),
(49, 44, 19, '', ''),
(50, 44, 20, '', ''),
(51, 48, 16, '', ''),
(52, 48, 17, '', ''),
(53, 48, 18, '', ''),
(54, 48, 19, '', ''),
(55, 48, 20, '', ''),
(56, 52, 16, '', ''),
(57, 52, 17, '', ''),
(58, 52, 18, '', ''),
(59, 52, 19, '', ''),
(60, 52, 20, '', ''),
(61, 56, 16, '', ''),
(62, 56, 17, '', ''),
(63, 56, 18, '', ''),
(64, 56, 19, '', ''),
(65, 56, 20, '', ''),
(66, 60, 16, '', ''),
(67, 60, 17, '', ''),
(68, 60, 18, '', ''),
(69, 60, 19, '', ''),
(70, 60, 20, '', ''),
(71, 64, 16, '', ''),
(72, 64, 17, '', ''),
(73, 64, 18, '', ''),
(74, 64, 19, '', ''),
(75, 64, 20, '', ''),
(76, 68, 16, '', ''),
(77, 68, 17, '', ''),
(78, 68, 18, '', ''),
(79, 68, 19, '', ''),
(80, 68, 20, '', ''),
(81, 72, 16, '', ''),
(82, 72, 17, '', ''),
(83, 72, 18, '', ''),
(84, 72, 19, '', ''),
(85, 72, 20, '', ''),
(86, 76, 16, '', ''),
(87, 76, 17, '', ''),
(88, 76, 18, '', ''),
(89, 76, 19, '', ''),
(90, 76, 20, '', ''),
(91, 80, 16, '', ''),
(92, 80, 17, '', ''),
(93, 80, 18, '', ''),
(94, 80, 19, '', ''),
(95, 80, 20, '', ''),
(96, 84, 16, '', ''),
(97, 84, 17, '', ''),
(98, 84, 18, '', ''),
(99, 84, 19, '', ''),
(100, 84, 20, '', ''),
(101, 88, 16, '', ''),
(102, 88, 17, '', ''),
(103, 88, 18, '', ''),
(104, 88, 19, '', ''),
(105, 88, 20, '', ''),
(106, 92, 16, '', ''),
(107, 92, 17, '', ''),
(108, 92, 18, '', ''),
(109, 92, 19, '', ''),
(110, 92, 20, '', ''),
(111, 96, 16, '', ''),
(112, 96, 17, '', ''),
(113, 96, 18, '', ''),
(114, 96, 19, '', ''),
(115, 96, 20, '', ''),
(116, 100, 16, '', ''),
(117, 100, 17, '', ''),
(118, 100, 18, '', ''),
(119, 100, 19, '', ''),
(120, 100, 20, '', ''),
(121, 104, 16, '', ''),
(122, 104, 17, '', ''),
(123, 104, 18, '', ''),
(124, 104, 19, '', ''),
(125, 104, 20, '', ''),
(126, 108, 16, '', ''),
(127, 108, 17, '', ''),
(128, 108, 18, '', ''),
(129, 108, 19, '', ''),
(130, 108, 20, '', ''),
(131, 112, 16, '', ''),
(132, 112, 17, '', ''),
(133, 112, 18, '', ''),
(134, 112, 19, '', ''),
(135, 112, 20, '', ''),
(136, 116, 16, '', ''),
(137, 116, 17, '', ''),
(138, 116, 18, '', ''),
(139, 116, 19, '', ''),
(140, 116, 20, '', ''),
(141, 120, 16, '', ''),
(142, 120, 17, '', ''),
(143, 120, 18, '', ''),
(144, 120, 19, '', ''),
(145, 120, 20, '', ''),
(146, 124, 16, '', ''),
(147, 124, 17, '', ''),
(148, 124, 18, '', ''),
(149, 124, 19, '', ''),
(150, 124, 20, '', ''),
(151, 128, 16, '', ''),
(152, 128, 17, '', ''),
(153, 128, 18, '', ''),
(154, 128, 19, '', ''),
(155, 128, 20, '', ''),
(156, 132, 16, '4', '5'),
(157, 132, 17, '5', '7'),
(158, 132, 18, '5', '9'),
(159, 132, 19, '8', '11'),
(160, 132, 20, '12', '20'),
(161, 136, 16, '4', '5'),
(162, 136, 17, '6', '7'),
(163, 136, 18, '8', '9'),
(164, 136, 19, '10', '11'),
(165, 136, 20, '13', '12'),
(166, 140, 16, '', ''),
(167, 140, 17, '', ''),
(168, 140, 18, '', ''),
(169, 140, 19, '', ''),
(170, 140, 20, '', '');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detalle_sub_ex_pd`
--

CREATE TABLE `detalle_sub_ex_pd` (
  `id` int(11) NOT NULL,
  `id_det_ex_pd` int(11) NOT NULL,
  `id_detalle_sub` int(11) NOT NULL,
  `resultado` mediumtext NOT NULL,
  `nota` varchar(80) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `detalle_sub_ex_pd`
--

INSERT INTO `detalle_sub_ex_pd` (`id`, `id_det_ex_pd`, `id_detalle_sub`, `resultado`, `nota`) VALUES
(1, 2, 16, '', ''),
(2, 2, 17, '', ''),
(3, 2, 18, '', ''),
(4, 2, 19, '', ''),
(5, 2, 20, '', '');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `examenes`
--

CREATE TABLE `examenes` (
  `id` int(11) NOT NULL,
  `nombre` text NOT NULL,
  `id_categoria` int(11) NOT NULL,
  `id_seccion` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `examenes`
--

INSERT INTO `examenes` (`id`, `nombre`, `id_categoria`, `id_seccion`) VALUES
(1, 'HEMATOLOGIA COMPLETA', 1, 1),
(2, 'QUIMICA SANGUINEA', 1, 1),
(3, 'GLOBULINAS', 0, 0),
(4, 'COAGULACION SANGUINEA', 0, 0),
(5, 'LIPIDOS', 0, 0),
(6, 'ELECTROLITOS SERICOS', 0, 0),
(7, 'BACTERIOLOGIA ', 0, 0),
(8, 'SEROLOGIA', 0, 0),
(9, 'PRUEBAS ESPECIALES                                          ', 0, 0),
(10, 'CURVA DE TOLERANCIA GLUCOSADA ', 0, 0),
(11, 'TEST DE LACTOSA ', 0, 0),
(12, 'HIERRO SERICO ', 0, 0),
(13, 'GLUCOSA POS-PANDRIAL                                        ', 0, 0),
(14, 'PRUEBAS HORMONALES', 0, 0),
(15, 'PH Y GASES ARTERIALES ', 0, 0),
(16, 'ANALISIS MACROSCOPICO DE LIQUIDO CEFALORRAQUIDEO ', 0, 0),
(17, 'ANALISIS MICROSCOPICO DE LIQUIDO CEFALORRAQUIDEO: ', 0, 0),
(18, 'ANALISIS QUIMICO DE LIQUIDO CEFALORRAQUIDEO: ', 0, 0),
(19, 'ANALISIS MACROSCOPICO LIQUIDO SINOVIAL ', 0, 0),
(20, 'ANALISIS MICROSCOPICO DE LIQUIDO SINOVIAL ', 0, 0),
(21, 'ANALISIS QUIMICO DE LIQUIDO SINOVIAL ', 0, 0),
(22, 'ANALISIS MACROSCOPICO DE LIQUIDO PLEURAL ', 0, 0),
(23, 'ANALISIS MICROSCOPICO DE LIQUIDO PLEURAL ', 0, 0),
(24, 'ANALISIS QUIMICO DE LIQUIDO PLEURAL ', 0, 0),
(25, 'ANALISIS MACROSCOPICO DE LIQUIDO PERICARDIO ', 0, 0),
(26, 'ANALISIS MICROSCOPICO DE LIQUIDO PERICARDIO ', 0, 0),
(27, 'ANALISIS QUIMICO DE LIQUIDO PERICARDIO ', 0, 0),
(28, 'ANALISIS MACROSCOPICO DE LIQUIDO PERITONEAL O ASCITICO ', 0, 0),
(29, 'ANALISIS MICROSCOPICO DE LIQUIDO PERITONEAL O ASCITICO ', 0, 0),
(30, 'ANALISIS QUIMICO DE LIQUIDO PERITONEAL O ASCITICO', 0, 0),
(31, 'EXAMEN MACROSCOPICO DE ORINA', 0, 0),
(32, 'CARACTERISTICAS QUIMICAS DE EXAMEN DE ORINA', 0, 0),
(33, 'EXAMEN MICROSCOPICO DE LA ORINA', 0, 0),
(34, 'DEPURACION DE CREATININA EN ORINA DE 24 HORAS', 0, 0),
(35, 'PRUEBA DE EMBARAZO EN ORINA ', 0, 0),
(36, 'PROTEINAS EN ORINA DE 24 HORAS ', 0, 0),
(37, 'CALCIO EN ORINA DE 24 HORAS ', 0, 0),
(38, 'FOSFORO EN ORINA DE 24 HORAS ', 0, 0),
(39, 'ACIDO URICO EN ORINA DE 24 HORAS', 0, 0),
(40, 'UREA EN ORINA DE 24 HORAS ', 0, 0),
(41, 'SODIO EN ORINA DE 24 HORAS ', 0, 0),
(42, 'POTASIO EN ORINA DE 24 HORAS ', 0, 0),
(43, 'CLORO EN ORINA DE 24 HORAS ', 0, 0),
(44, 'AMILASURIA', 0, 0),
(45, 'PROTEINA DE BENCE - JONES', 0, 0),
(46, 'RECUENTO MINUTADO ', 0, 0),
(47, 'EXAMEN DE HECES', 0, 0),
(48, 'EXAMEN MICROSCOPICO DE HECES METODO DIRECTO ', 0, 0),
(49, 'TRANSAMINASA OXALACETICA                                    ', 0, 0),
(50, 'TRANSAMINASA PIRUVICA                                       ', 0, 0),
(51, 'BILIRRUBINA TOTAL                                           ', 0, 0),
(52, 'BILIRRUBINA DIRECTA                                         ', 0, 0),
(53, 'BILIRRUBINA INDIRECTA                                       ', 0, 0),
(54, 'LACTATO DESHIDROGENASA                                      ', 0, 0),
(55, 'CALCIO SERICO                                               ', 0, 0),
(56, 'ACIDO URICO', 0, 0),
(57, 'CREATININA                                                  ', 0, 0),
(58, 'UREA                                                        ', 0, 0),
(59, 'PROLACTINA', 0, 0),
(60, 'PROTEOGRAMA', 0, 0),
(61, 'HEMATOLOGIA COMPLETA', 0, 0),
(62, 'BILIRRUBINAS', 0, 0),
(63, 'GRUPO SANGUINEO', 0, 0),
(64, 'CALCIO IONICO', 0, 0),
(65, 'ESTRADIOL', 0, 0),
(66, 'PROGESTERONA', 0, 0),
(67, 'FSH                                                                                                                                                   ', 0, 0),
(68, 'LH', 0, 0),
(69, 'HEPATITIS C', 0, 0),
(70, 'HEMOGLOBINA GLICOSILADA', 0, 0),
(71, 'TROPONINA I CUALITATIVA', 0, 0),
(72, 'Antony', 0, 0),
(73, 'Antony', 0, 0),
(74, 'Antony', 0, 0),
(75, 'daasdads', 0, 0),
(76, 'daasdads', 0, 0),
(77, '', 0, 0),
(78, '', 0, 0),
(79, 'dsf', 0, 0),
(80, 'and', 0, 0),
(81, 'asasd', 0, 0),
(82, 'uyiiu', 0, 0),
(83, 'sa', 0, 0),
(84, 'sa', 0, 0),
(85, 'Examen1', 0, 2),
(86, 'Examen2', 0, 2),
(87, 'Examen3', 0, 2),
(88, 'Examen4', 0, 2),
(89, 'Examen5', 0, 2),
(90, 'Examen6', 0, 2),
(91, 'Examen7', 0, 2),
(92, 'Examen8', 0, 2),
(93, 'Examen9', 0, 2),
(94, 'Examen10', 0, 2),
(95, 'Examen11', 0, 2),
(96, 'examen12', 0, 2),
(97, 'examen13', 0, 2),
(98, 'aa', 0, 2),
(99, 'aass', 0, 2),
(100, 'aasss', 0, 2),
(101, 'ssss', 0, 1),
(102, 'hematologiaCompleta2', 0, 2),
(103, 'hematologia4', 1, 2),
(104, 'aaaa', 0, 1),
(105, 'hh', 0, 1),
(106, 'eee', 0, 2),
(107, 'hematologiaCompleta4', 1, 2),
(108, 'IIII', 2, 1),
(109, 'LL', 1, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `examenes_paciente`
--

CREATE TABLE `examenes_paciente` (
  `id` int(11) NOT NULL,
  `id_orden` int(11) NOT NULL,
  `id_ex` int(11) NOT NULL,
  `id_pac` int(11) NOT NULL,
  `id_bio` int(11) NOT NULL,
  `fecha` timestamp NOT NULL DEFAULT current_timestamp(),
  `fecha_actualizacion` timestamp NULL DEFAULT NULL,
  `id_usuario` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `examenes_paciente`
--

INSERT INTO `examenes_paciente` (`id`, `id_orden`, `id_ex`, `id_pac`, `id_bio`, `fecha`, `fecha_actualizacion`, `id_usuario`) VALUES
(1, 5, 107, 24, 44, '2024-04-04 03:08:14', NULL, 0),
(2, 6, 107, 24, 44, '2024-04-06 03:09:26', NULL, 0),
(3, 7, 107, 24, 44, '2024-04-06 03:11:01', NULL, 0),
(4, 7, 103, 24, 44, '2024-04-06 03:11:01', NULL, 0),
(5, 8, 107, 24, 44, '2024-04-06 03:19:01', NULL, 0),
(6, 8, 103, 24, 44, '2024-04-06 03:19:01', NULL, 0),
(7, 9, 107, 24, 44, '2024-04-06 03:22:30', NULL, 0),
(8, 9, 103, 24, 44, '2024-04-06 03:22:31', NULL, 0),
(9, 10, 107, 24, 44, '2024-04-06 17:18:01', NULL, 0),
(10, 11, 107, 24, 44, '2024-04-05 17:18:09', NULL, 0),
(11, 12, 107, 24, 44, '2024-04-06 17:23:43', NULL, 0),
(12, 13, 107, 24, 44, '2024-04-06 17:24:57', NULL, 0),
(13, 14, 107, 24, 44, '2024-04-06 17:27:38', NULL, 0),
(14, 15, 107, 24, 44, '2024-04-06 17:36:33', NULL, 0),
(15, 16, 107, 24, 44, '2024-04-06 17:38:12', NULL, 0),
(16, 17, 107, 24, 44, '2024-04-06 17:38:17', NULL, 0),
(17, 18, 107, 24, 44, '2024-04-06 17:38:55', NULL, 0),
(18, 19, 107, 24, 44, '2024-04-06 17:40:44', NULL, 0),
(19, 20, 107, 24, 44, '2024-04-06 17:41:23', NULL, 0),
(20, 21, 107, 24, 44, '2024-04-06 17:43:53', NULL, 0),
(21, 22, 107, 24, 44, '2024-04-06 17:44:49', NULL, 0),
(22, 23, 107, 24, 44, '2024-04-06 17:45:34', NULL, 0),
(23, 24, 107, 24, 44, '2024-04-06 17:46:05', NULL, 0),
(24, 25, 107, 24, 44, '2024-04-06 18:23:14', NULL, 0),
(25, 26, 107, 24, 44, '2024-04-06 18:24:04', NULL, 0),
(26, 27, 107, 24, 44, '2024-04-06 18:24:59', NULL, 0),
(27, 28, 107, 24, 44, '2024-04-06 18:27:23', NULL, 0),
(28, 29, 107, 24, 44, '2024-04-06 18:29:14', NULL, 0),
(29, 30, 107, 24, 44, '2024-04-06 18:30:19', NULL, 0),
(30, 31, 107, 24, 44, '2024-04-06 18:31:36', NULL, 0),
(31, 32, 107, 24, 44, '2024-04-06 18:33:33', NULL, 0),
(32, 33, 107, 24, 44, '2024-04-06 18:34:37', NULL, 0),
(33, 34, 107, 24, 44, '2024-04-06 18:41:21', NULL, 0),
(34, 35, 107, 24, 44, '2024-04-06 18:54:47', NULL, 0),
(35, 36, 107, 24, 44, '2024-04-05 18:57:31', NULL, 0),
(36, 37, 107, 24, 44, '2024-04-06 19:14:55', NULL, 0),
(37, 38, 107, 24, 44, '2024-04-06 19:29:52', NULL, 0),
(38, 39, 107, 24, 44, '2024-04-06 19:31:19', NULL, 0),
(39, 40, 107, 24, 44, '2024-04-06 20:42:41', NULL, 0),
(40, 41, 107, 24, 44, '2024-04-18 19:19:08', NULL, 0),
(41, 42, 107, 24, 44, '2024-04-25 23:15:14', NULL, 0),
(42, 42, 103, 24, 44, '2024-04-25 23:15:14', NULL, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `examenes_pendientes`
--

CREATE TABLE `examenes_pendientes` (
  `id` int(11) NOT NULL,
  `id_ex` int(11) NOT NULL,
  `id_pac` int(11) NOT NULL,
  `status` varchar(10) NOT NULL DEFAULT 'pendiente',
  `fecha` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `examenes_pendientes`
--

INSERT INTO `examenes_pendientes` (`id`, `id_ex`, `id_pac`, `status`, `fecha`) VALUES
(3, 107, 24, 'pendiente', '2024-04-24 18:43:16'),
(4, 107, 24, 'pendiente', '2024-04-24 18:44:01');

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
-- Estructura de tabla para la tabla `ordenes`
--

CREATE TABLE `ordenes` (
  `id` int(11) NOT NULL,
  `clave` varchar(5) NOT NULL,
  `orden` int(11) NOT NULL,
  `id_paciente` int(11) NOT NULL,
  `id_bio` int(11) NOT NULL,
  `fecha` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `ordenes`
--

INSERT INTO `ordenes` (`id`, `clave`, `orden`, `id_paciente`, `id_bio`, `fecha`) VALUES
(1, '0', 1, 24, 44, '2024-04-06 02:54:00'),
(2, 'clave', 5, 24, 44, '2024-04-06 02:55:50'),
(3, 'clave', 5, 24, 44, '2024-04-06 02:57:58'),
(4, 'orden', 5, 24, 44, '2024-04-06 03:06:00'),
(5, 'orden', 6, 24, 44, '2024-04-06 03:08:14'),
(6, 'orden', 8, 24, 44, '2024-04-06 03:09:26'),
(7, 'orden', 9, 24, 44, '2024-04-06 03:11:01'),
(8, 'orden', 10, 24, 44, '2024-04-06 03:19:01'),
(9, 'orden', 11, 24, 44, '2024-04-06 03:22:30'),
(10, 'no', 10, 24, 44, '2024-04-06 17:18:01'),
(11, 'no', 11, 24, 44, '2024-04-06 17:18:09'),
(12, 'no', 12, 24, 44, '2024-04-06 17:23:43'),
(13, 'no', 13, 24, 44, '2024-04-06 17:24:57'),
(14, 'no', 14, 24, 44, '2024-04-06 17:27:38'),
(15, 'no', 15, 24, 44, '2024-04-06 17:36:33'),
(16, 'orden', 0, 24, 44, '2024-04-06 17:38:12'),
(17, 'no', 17, 24, 44, '2024-04-06 17:38:17'),
(18, 'no', 18, 24, 44, '2024-04-06 17:38:55'),
(19, 'no', 19, 24, 44, '2024-04-06 17:40:44'),
(20, 'no', 20, 24, 44, '2024-04-06 17:41:23'),
(21, 'no', 21, 24, 44, '2024-04-06 17:43:53'),
(22, 'no', 22, 24, 44, '2024-04-06 17:44:49'),
(23, 'no', 23, 24, 44, '2024-04-06 17:45:34'),
(24, 'no', 24, 24, 44, '2024-04-06 17:46:05'),
(25, 'no', 25, 24, 44, '2024-04-06 18:23:14'),
(26, 'no', 26, 24, 44, '2024-04-06 18:24:04'),
(27, 'no', 27, 24, 44, '2024-04-06 18:24:59'),
(28, 'no', 28, 24, 44, '2024-04-06 18:27:23'),
(29, 'no', 29, 24, 44, '2024-04-06 18:29:14'),
(30, 'no', 30, 24, 44, '2024-04-06 18:30:19'),
(31, 'no', 31, 24, 44, '2024-04-06 18:31:36'),
(32, 'no', 32, 24, 44, '2024-04-06 18:33:33'),
(33, 'no', 33, 24, 44, '2024-04-06 18:34:37'),
(34, 'no', 34, 24, 44, '2024-04-06 18:41:21'),
(35, 'orden', 199, 24, 44, '2024-04-06 18:54:47'),
(36, 'orden', 100, 24, 44, '2024-04-06 18:57:31'),
(37, 'orden', 999, 24, 44, '2024-04-06 19:14:55'),
(38, 'orden', 989, 24, 44, '2024-04-06 19:29:52'),
(39, 'orden', 9890, 24, 44, '2024-04-06 19:31:19'),
(40, 'orden', 807, 24, 44, '2024-04-06 20:42:41'),
(41, 'no', 41, 24, 44, '2024-04-18 19:19:08'),
(42, 'no', 42, 24, 44, '2024-04-25 23:15:14');

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
(26, 28146771, 'Fabian Silva', 'El Silencio', '04146308395', 'silvabravofabian@gmail.com', '2015-01-15', 'V', 'Hombre', NULL),
(31, 28146771, 'Fabiansito', 'El Silencio', '04146308395', 'silvabravofabian@gmail.com', '2020-12-17', 'N', 'Hombre', NULL),
(32, 28146771, 'Olivia', 'El Silencio', '04146308395', 'silvabravofabian@gmail.com', '2023-12-18', 'N', 'Hombre', NULL),
(33, 28146772, 'Fabian 2', 'El silencio', '04146308395', 'fabian2@gmail.com', '2002-12-17', 'V', 'Hombre', NULL),
(34, 28146771, ' Fabian hijo ', 'El silencio', '04146308395', 'silvabravofabian@gmail.com', '2020-02-01', 'N', 'Hombre', NULL);

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
  `genero` varchar(10) DEFAULT NULL,
  `status` varchar(8) NOT NULL DEFAULT 'activo'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `rangos_detalle`
--

INSERT INTO `rangos_detalle` (`id`, `id_det_ex`, `desde`, `hasta`, `inferior`, `superior`, `genero`, `status`) VALUES
(1, 349, 0, 0, 1.00, 15.00, 'Mujer', 'activo'),
(2, 349, 0, 0, 2.00, 16.00, 'Hombre', 'activo'),
(3, 351, 0, 0, 14.00, 15.00, 'femenino', 'activo'),
(4, 351, 0, 0, 10.00, 15.00, 'masculino', 'activo'),
(5, 352, 0, 0, 10.00, 15.00, 'masculino', 'activo'),
(6, 352, 0, 0, 14.00, 15.00, 'femenino', 'activo'),
(7, 353, 0, 0, 21.00, 23.00, 'todos', 'activo'),
(8, 359, 2, 5, 1.00, 15.00, 'todos', 'activo'),
(9, 360, 18, 100, 10.00, 16.00, 'masculino', 'activo'),
(10, 360, 18, 100, 9.00, 15.00, 'femenino', 'activo'),
(11, 360, 0, 18, 6.00, 13.00, 'todos', 'activo'),
(12, 362, 18, 100, 9.00, 15.00, 'femenino', 'activo'),
(13, 362, 18, 100, 10.00, 16.00, 'masculino', 'activo'),
(14, 362, 0, 18, 6.00, 13.00, 'todos', 'activo'),
(15, 363, 10, 30, 10.00, 20.00, 'todos', 'activo'),
(16, 363, 20, 25, 15.00, 18.00, 'todos', 'activo');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `resultados_detalle`
--

CREATE TABLE `resultados_detalle` (
  `id` int(11) NOT NULL,
  `resultado` tinytext NOT NULL,
  `id_det_ex` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `resultados_detalle`
--

INSERT INTO `resultados_detalle` (`id`, `resultado`, `id_det_ex`) VALUES
(1, 'rojo', 350),
(2, 'azul', 350),
(3, 'Rojo', 356),
(4, 'Verde', 356),
(5, 'Azul', 356),
(6, 'amarillo', 364),
(7, 'verde', 364),
(8, 'rojo', 364),
(9, 'azul', 364);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `seccion_examen`
--

CREATE TABLE `seccion_examen` (
  `id` int(11) NOT NULL,
  `nombre` tinytext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `seccion_examen`
--

INSERT INTO `seccion_examen` (`id`, `nombre`) VALUES
(1, 'hematocrito'),
(2, 'hematologia'),
(3, 'seccionPrueba4');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `subcaracteristicas_detalle`
--

CREATE TABLE `subcaracteristicas_detalle` (
  `id` int(11) NOT NULL,
  `tipo` tinytext NOT NULL,
  `nombre` tinytext NOT NULL,
  `valor` text DEFAULT NULL,
  `id_det_ex` int(11) NOT NULL,
  `status` varchar(8) NOT NULL DEFAULT 'activo'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `subcaracteristicas_detalle`
--

INSERT INTO `subcaracteristicas_detalle` (`id`, `tipo`, `nombre`, `valor`, `id_det_ex`, `status`) VALUES
(1, 'texto', 'color', '', 350, 'activo'),
(2, 'numero', 'numero', '', 351, 'activo'),
(3, 'formula', 'formula', '{numero}+{numero}', 351, 'activo'),
(4, 'numero', 'numero', '', 352, 'activo'),
(5, 'formula', 'formula', '{numero}+{numero}', 352, 'activo'),
(6, 'numero', 'b', '', 357, 'activo'),
(7, 'numero', 'a', '', 357, 'activo'),
(8, 'numero', 'd', '', 357, 'activo'),
(9, 'numero', 'c', '', 357, 'activo'),
(10, 'formula', 'total', 'a,+,b,+,c,+,d', 357, 'activo'),
(11, 'numero', 'a', '', 361, 'activo'),
(12, 'numero', 'c', '', 361, 'activo'),
(13, 'numero', 'b', '', 361, 'activo'),
(14, 'numero', 'd', '', 361, 'activo'),
(15, 'formula', 'total', 'a,+,b,+,c,+,d', 361, 'activo'),
(16, 'numero', 'a', '', 365, 'activo'),
(17, 'numero', 'b', '', 365, 'activo'),
(18, 'numero', 'c', '', 365, 'activo'),
(19, 'numero', 'd', '', 365, 'activo'),
(20, 'formula', 'total', 'a,*,b,/,c,+,d', 365, 'activo');

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
  `bioanalista` int(11) NOT NULL,
  `direccion` text NOT NULL,
  `foto_carnet` mediumblob NOT NULL,
  `nivel` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `pre_cedula`, `cedula`, `password`, `nombre`, `correo`, `telefono`, `bioanalista`, `direccion`, `foto_carnet`, `nivel`) VALUES
(5, 'V', 28146771, '$2b$04$YGVtJYbYnEnKemyDy3VBxu6xXeti08efB7wVyY0Pe9C/Zr81K4Kyq', 'Fabian Silva Bravo', 'silvabravofabian@gmail.com', '04146308395', 0, 'San Francisco', '', 3),
(6, 'V', 123, '$2b$04$Ih7JFMxYtPcWXrKupAjqnuLz.WSpE8l3Oaxofbl5IlKb4TfDbsbEi', 'prueba', 'prueba@gmail.com', '123', 0, 'prueba', '', 3);

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
-- Indices de la tabla `categoria_examen`
--
ALTER TABLE `categoria_examen`
  ADD PRIMARY KEY (`id`);

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
-- Indices de la tabla `detalles_ex_pendientes`
--
ALTER TABLE `detalles_ex_pendientes`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `detalle_subcaracteristica_paciente`
--
ALTER TABLE `detalle_subcaracteristica_paciente`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `detalle_sub_ex_pd`
--
ALTER TABLE `detalle_sub_ex_pd`
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
-- Indices de la tabla `examenes_pendientes`
--
ALTER TABLE `examenes_pendientes`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `niveles_usuario`
--
ALTER TABLE `niveles_usuario`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `ordenes`
--
ALTER TABLE `ordenes`
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
-- Indices de la tabla `resultados_detalle`
--
ALTER TABLE `resultados_detalle`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `seccion_examen`
--
ALTER TABLE `seccion_examen`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `subcaracteristicas_detalle`
--
ALTER TABLE `subcaracteristicas_detalle`
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
-- AUTO_INCREMENT de la tabla `categoria_examen`
--
ALTER TABLE `categoria_examen`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `detalles_examen`
--
ALTER TABLE `detalles_examen`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=368;

--
-- AUTO_INCREMENT de la tabla `detalles_examenes_paciente`
--
ALTER TABLE `detalles_examenes_paciente`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=144;

--
-- AUTO_INCREMENT de la tabla `detalles_ex_pendientes`
--
ALTER TABLE `detalles_ex_pendientes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT de la tabla `detalle_subcaracteristica_paciente`
--
ALTER TABLE `detalle_subcaracteristica_paciente`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=171;

--
-- AUTO_INCREMENT de la tabla `detalle_sub_ex_pd`
--
ALTER TABLE `detalle_sub_ex_pd`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT de la tabla `examenes`
--
ALTER TABLE `examenes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=110;

--
-- AUTO_INCREMENT de la tabla `examenes_paciente`
--
ALTER TABLE `examenes_paciente`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;

--
-- AUTO_INCREMENT de la tabla `examenes_pendientes`
--
ALTER TABLE `examenes_pendientes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `niveles_usuario`
--
ALTER TABLE `niveles_usuario`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `ordenes`
--
ALTER TABLE `ordenes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;

--
-- AUTO_INCREMENT de la tabla `pacientes`
--
ALTER TABLE `pacientes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT de la tabla `rangos_detalle`
--
ALTER TABLE `rangos_detalle`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT de la tabla `resultados_detalle`
--
ALTER TABLE `resultados_detalle`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `seccion_examen`
--
ALTER TABLE `seccion_examen`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `subcaracteristicas_detalle`
--
ALTER TABLE `subcaracteristicas_detalle`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

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
