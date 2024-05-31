-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 28-05-2024 a las 21:08:22
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
(1, 'ESPECIALIZADOS'),
(2, 'NO ESPECIALIZADOS');

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
(1, 1, 'HEMOGLOBINA', 1, 'g/dl', 1, 'activo'),
(2, 1, 'HEMATOCRITO', 2, '%', 1, 'activo'),
(3, 1, 'RETICULOSITOS', 6, '%', 0, 'nulo'),
(4, 1, 'PLAQUETAS', 5, 'mm3', 0, 'activo'),
(5, 1, 'LEUCOCITOS', 3, 'mm3', 1, 'activo'),
(6, 1, 'FORMULA LEUCOCITARIA', 3, '%', 1, 'nulo'),
(7, 2, 'T.P.T. (PACIENTE)', 3, 'Seg', 0, 'activo'),
(8, 2, 'T.P. (CONTROL)', 1, 'Seg', 0, 'activo'),
(9, 2, 'T.P.T. (CONTROL)', 4, 'Seg', 0, 'activo'),
(11, 2, 'T.P. (PACIENTE)', 0, 'Seg', 0, 'activo'),
(12, 1, 'FORMULA LEUCOCITARIA', 0, '', 1, 'nulo'),
(13, 1, 'FORMULA LEUCOCITARIA', 0, '', 1, 'nulo'),
(14, 1, 'FORMU', 0, '', 1, 'nulo'),
(15, 1, 'FORMULA LEUCOCITARIA', 4, '%', 1, 'activo'),
(16, 3, 'VSG', 1, 'mm3', 0, 'activo'),
(17, 8, 'GLICEMIA BASAL', 1, 'mg/dl', 0, 'activo'),
(18, 10, 'UREA', 3, 'mg/dl', 0, 'activo'),
(19, 11, 'GLICEMIA POSTPANDRIAL', 2, 'mg/dl', 0, 'activo'),
(20, 12, 'CREATININA SERICA', 4, 'mg/dl', 0, 'activo'),
(21, 13, 'COLESTEROL', 5, 'mg/dl', 0, 'activo'),
(22, 14, 'BILIRRUBINA DIRECTA', 11, 'mg/dl', 0, 'activo'),
(23, 15, 'ACIDO URICO', 7, 'mg/dl', 0, 'activo'),
(24, 16, 'TRIGLICERIDOS', 6, 'mg/dl', 0, 'activo'),
(25, 17, 'BILIRRUBINA INDIRECTA', 12, 'mg/dl', 0, 'activo'),
(26, 18, 'GAMMA GLUTAMIL TRANSFERASA (GGT)', 17, 'mg/dl', 1, 'activo'),
(27, 19, 'TGO / AST', 8, 'U/L', 1, 'activo'),
(28, 20, 'DESHIDROGENASA LACTICA (LDH)', 13, 'mg/dl', 1, 'activo'),
(29, 21, 'FOSFORO', 19, 'mg/dl', 0, 'activo'),
(30, 22, 'FOSFATASA ALCALINA', 15, 'U/L', 1, 'activo'),
(31, 23, 'AMILASA', 21, 'U/L', 0, 'activo'),
(32, 24, 'CALCIO', 19, 'mg/dl', 0, 'activo'),
(33, 25, 'TGP / ALT', 9, 'U/L', 1, 'activo'),
(34, 26, 'BILIRRUBINA TOTAL', 10, 'mg/dl', 0, 'activo'),
(35, 27, 'MAGNESIO', 24, 'mg/dl', 0, 'activo'),
(36, 28, 'HIERRO', 25, 'mg/dl', 0, 'activo'),
(37, 5, 'REACCION O PH', 3, '', 0, 'activo'),
(38, 5, 'REACCION O PH', 3, '', 0, 'nulo'),
(39, 5, 'ASPECTO', 1, '', 0, 'activo'),
(40, 5, 'OLOR', 2, '', 0, 'activo'),
(41, 5, 'DENSIDAD', 4, '', 0, 'activo'),
(42, 5, 'CANTIDAD', 1, 'ml', 0, 'activo'),
(43, 5, 'COLOR', 3, '', 0, 'activo'),
(44, 6, 'SANGRE', 7, '', 0, 'activo'),
(45, 6, 'PROTEINAS', 2, '', 0, 'activo'),
(46, 6, 'LEUCOCITOS', 8, '', 0, 'activo'),
(47, 6, 'CETONA', 5, '', 0, 'activo'),
(48, 6, 'BILIRRUBINA', 3, '', 0, 'activo'),
(49, 6, 'UROBILINOGENO', 4, 'mg/dl', 0, 'activo'),
(50, 6, 'NITRITOS', 6, '', 0, 'activo'),
(51, 6, 'GLUCOSA', 1, '', 0, 'activo'),
(52, 7, 'ESPERMATOZOIDES', 11, '', 0, 'activo'),
(53, 7, 'CELULAS EPITETALES', 1, '', 0, 'activo'),
(54, 7, 'MUCINA', 3, '', 0, 'activo'),
(55, 7, 'BACTERIAS', 2, '', 0, 'activo'),
(56, 7, 'LEUCOCITOS', 4, '', 0, 'activo'),
(57, 7, 'HEMATIES', 5, '', 0, 'activo'),
(58, 29, 'ANTI - HIV 1 2 RAPID TEST', 0, '', 0, 'activo'),
(59, 30, 'V.D.R.L', 0, '', 0, 'activo'),
(60, 31, 'PROTEINA C REACTIVA LATEX', 0, '', 1, 'activo'),
(61, 32, 'PRUEBA DE EMBARAZO EN SANGRE (BHCG)', 1, 'mg/L', 1, 'activo'),
(62, 33, 'FACTOR REUMATOIDEO RA-TEST', 0, 'IU/mL', 1, 'activo'),
(63, 34, 'GRUPO SANGUINEO', 1, '', 1, 'activo'),
(64, 34, 'FACTOR RH', 2, '', 1, 'activo'),
(65, 1, 'RBC', 6, '10^6/uL', 1, 'activo'),
(66, 1, 'MCV', 7, 'fL', 1, 'activo'),
(67, 1, 'MCH', 8, 'P/g', 1, 'activo'),
(68, 1, 'NOTA', 50, NULL, 1, 'activo'),
(69, 1, 'MCHC', 9, 'g/dL', 1, 'activo'),
(70, 35, 'T.P.T. (CONTROL)', 1, 'Seg', 1, 'activo'),
(71, 35, 'T.P.T. (PACIENTE)', 2, 'Seg', 1, 'activo'),
(72, 36, 'T.P. (CONTROL)', 1, 'Seg', 1, 'activo'),
(73, 36, 'T.P. (PACIENTE)', 2, 'Seg', 1, 'activo'),
(74, 37, 'ALBUMINA', 2, 'g/dL', 1, 'activo'),
(75, 37, 'PROTEINAS TOTALES', 1, 'g/dL', 1, 'activo'),
(76, 37, 'GLOBULINA', 3, 'g/dL', 1, 'activo'),
(77, 37, 'PROTEINAS TOTALES', 1, 'g/dL', 1, 'nulo'),
(78, 37, 'RELACION ALB GLOB', 4, '', 1, 'activo'),
(79, 38, 'COLESTEROL', 1, 'mg/dL', 0, 'activo'),
(80, 38, 'TRIGLICERIDOS', 2, 'mg/dL', 0, 'activo'),
(81, 38, 'H. D. L. COLESTEROL', 3, 'mg/dL', 0, 'activo'),
(82, 38, 'L. D. L. COLESTEROL', 5, 'mg/dL', 0, 'activo'),
(83, 38, 'V. L. D. L COLESTEROL', 6, 'mg/dL', 0, 'activo'),
(84, 4, 'hlc', 1, NULL, 1, 'activo'),
(85, 4, 'hlc2', 0, '', 1, 'activo');

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
(1, 1, 1, 1, 1, 11.20, 12.90, '', ''),
(2, 2, 1, 1, 2, 35.00, 48.00, '', ''),
(3, 5, 1, 1, 3, 4500.00, 12000.00, '', ''),
(4, 15, 1, 1, 0, 0.00, 0.00, 'subCaracteristica', ''),
(5, 4, 1, 1, 7, 150000.00, 450000.00, '', ''),
(6, 11, 2, 2, 0, 0.00, 0.00, '', ''),
(7, 8, 2, 2, 0, 0.00, 0.00, '', ''),
(8, 7, 2, 2, 0, 0.00, 0.00, '', ''),
(9, 9, 2, 2, 0, 0.00, 0.00, '', ''),
(10, 11, 2, 3, 0, 0.00, 0.00, '', ''),
(11, 8, 2, 3, 0, 0.00, 0.00, '', ''),
(12, 7, 2, 3, 0, 0.00, 0.00, '', ''),
(13, 9, 2, 3, 0, 0.00, 0.00, '', ''),
(14, 17, 4, 4, 14, 70.00, 100.00, '', ''),
(15, 19, 4, 4, 11, 0.00, 140.00, '', ''),
(16, 18, 4, 4, 0, 0.00, 0.00, '', ''),
(17, 20, 4, 4, 19, 0.50, 1.40, '', ''),
(18, 21, 4, 4, 20, 0.00, 200.00, '', ''),
(19, 24, 4, 4, 12, 40.00, 150.00, '', ''),
(20, 23, 4, 4, 16, 2.50, 7.20, '', ''),
(21, 27, 4, 4, 22, 0.00, 32.00, '', ''),
(22, 33, 4, 4, 21, 0.00, 34.00, '', ''),
(23, 34, 4, 4, 27, 0.00, 1.00, '', ''),
(24, 22, 4, 4, 15, 0.00, 0.65, '', ''),
(25, 25, 4, 4, 26, 0.00, 0.35, '', ''),
(26, 28, 4, 4, 17, 80.00, 258.00, '', ''),
(27, 30, 4, 4, 25, 65.00, 300.00, '', ''),
(28, 26, 4, 4, 13, 6.00, 42.00, '', ''),
(29, 29, 4, 4, 18, 2.30, 4.60, '', ''),
(30, 32, 4, 4, 23, 8.50, 10.50, '', ''),
(31, 31, 4, 4, 24, 0.00, 90.00, '', ''),
(32, 35, 4, 4, 28, 1.60, 2.60, '', ''),
(33, 36, 4, 4, 30, 50.00, 170.00, '', ''),
(34, 51, 6, 5, 0, 0.00, 0.00, 'TRAZAS', ''),
(35, 45, 6, 5, 0, 0.00, 0.00, 'NEGATIVA', ''),
(36, 48, 6, 5, 0, 0.00, 0.00, 'NEGATIVA', ''),
(37, 49, 6, 5, 0, 0.00, 0.00, 'NORMAL', ''),
(38, 47, 6, 5, 0, 0.00, 0.00, 'NEGATIVA', ''),
(39, 50, 6, 5, 0, 0.00, 0.00, 'NEGATIVO', ''),
(40, 44, 6, 5, 0, 0.00, 0.00, 'NEGATIVA', ''),
(41, 46, 6, 5, 0, 0.00, 0.00, 'TRAZAS', ''),
(42, 53, 7, 6, 0, 0.00, 0.00, 'ABUNDANTES', ''),
(43, 55, 7, 6, 0, 0.00, 0.00, 'ESCASAS', ''),
(44, 54, 7, 6, 0, 0.00, 0.00, 'ESCASA', ''),
(45, 56, 7, 6, 0, 0.00, 0.00, '0 - 2 X CP', ''),
(46, 57, 7, 6, 0, 0.00, 0.00, '0 - 2 X CP', ''),
(47, 52, 7, 6, 0, 0.00, 0.00, '', ''),
(48, 39, 5, 7, 0, 0.00, 0.00, 'LIGERO TURBIO', ''),
(49, 42, 5, 7, 0, 0.00, 0.00, '10 ml', ''),
(50, 40, 5, 7, 0, 0.00, 0.00, 'SUI GENERI', ''),
(51, 37, 5, 7, 0, 0.00, 0.00, 'ACIDA (5)', ''),
(52, 43, 5, 7, 0, 0.00, 0.00, 'AMBAR', ''),
(53, 41, 5, 7, 0, 0.00, 0.00, '1005', '');

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
(1, 1, 1, 1, 5, 11.50, 15.00, '', ''),
(2, 2, 1, 1, 9, 36.00, 48.00, '', ''),
(3, 5, 1, 1, 4, 5000.00, 10000.00, '', ''),
(4, 15, 1, 1, 0, 0.00, 0.00, 'subCaracteristica', ''),
(5, 4, 1, 1, 7, 150000.00, 450000.00, '', ''),
(6, 65, 1, 1, 0, 0.00, 0.00, '', ''),
(7, 66, 1, 1, 0, 0.00, 0.00, '', ''),
(8, 67, 1, 1, 0, 0.00, 0.00, '', ''),
(9, 69, 1, 1, 0, 0.00, 0.00, '', ''),
(10, 68, 1, 1, 0, 0.00, 0.00, 'VALORES VERIFICADOS ', '');

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
(1, 4, 8, '', ''),
(2, 4, 9, '', ''),
(3, 4, 10, '', ''),
(4, 4, 11, '', ''),
(5, 4, 12, '', ''),
(6, 4, 13, '', '');

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
(1, 4, 8, '', ''),
(2, 4, 9, '', ''),
(3, 4, 10, '', ''),
(4, 4, 11, '', ''),
(5, 4, 12, '', ''),
(6, 4, 13, '', '');

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
(1, 'HEMATOLOGIA COMPLETA', 2, 1),
(3, 'VELOCIDAD DE SEDIMENTACION', 2, 1),
(4, 'BIOQUIMICA', 2, 2),
(5, 'EXAMEN MACROSCOPICO DE ORINA', 1, 3),
(6, 'CARACTERISTICAS QUIMICAS DE LA ORINA', 2, 3),
(7, 'EXAMEN MICROSCOPICO DE ORINA', 2, 3),
(8, 'GLICEMIA BASAL', 2, 2),
(10, 'UREA', 2, 2),
(11, 'GLICEMIA POSTPANDRIAL', 2, 2),
(12, 'CREATININA SERICA', 2, 2),
(13, 'COLESTEROL', 2, 2),
(14, 'BILIRRUBINA DIRECTA', 2, 2),
(15, 'ACIDO URICO', 2, 2),
(16, 'TRIGLICERIDOS', 2, 2),
(17, 'BILIRRUBINA INDIRECTA', 2, 2),
(18, 'GAMMA GLUTAMIL TRANSFERASA (GGT)', 2, 2),
(19, 'TGO / AST', 2, 2),
(20, 'DESHIDROGENASA LACTICA (LDH)', 2, 2),
(21, 'FOSFORO', 2, 2),
(22, 'FOSFATASA ALCALINA', 2, 2),
(23, 'AMILASA', 2, 2),
(24, 'CALCIO', 2, 2),
(25, 'TGP / ALT', 2, 2),
(26, 'BILIRRUBINA TOTAL', 2, 2),
(27, 'MAGNESIO', 2, 2),
(28, 'HIERRO', 2, 2),
(29, 'VIH PRUEBA PRESUNTIVA', 1, 5),
(30, 'V.D.R.L', 1, 5),
(31, 'PROTEINA C REACTIVA LATEX', 1, 5),
(32, 'PRUEBA DE EMBARAZO EN SANGRE (BHCG)', 1, 5),
(33, 'FACTOR REUMATOIDEO RA-TEST', 1, 5),
(34, 'GRUPO/ FACTOR RH', 2, 1),
(35, 'T.P.T ', 2, 1),
(36, 'T.P.', 2, 1),
(37, 'PROTEOGRAMA', 2, 2),
(38, 'PERFIL LIPIDICO', 1, 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `examenes_externos`
--

CREATE TABLE `examenes_externos` (
  `id` int(11) NOT NULL,
  `id_ex` int(11) NOT NULL,
  `bioanalista` varchar(20) NOT NULL,
  `nota` varchar(40) NOT NULL,
  `id_lab` int(11) NOT NULL,
  `id_pac` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `fecha` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
  `id_sede` int(11) NOT NULL,
  `fecha` timestamp NOT NULL DEFAULT current_timestamp(),
  `fecha_actualizacion` timestamp NULL DEFAULT NULL,
  `id_usuario` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `examenes_paciente`
--

INSERT INTO `examenes_paciente` (`id`, `id_orden`, `id_ex`, `id_pac`, `id_bio`, `id_sede`, `fecha`, `fecha_actualizacion`, `id_usuario`) VALUES
(1, 1, 1, 26, 44, 4, '2024-05-24 22:21:28', NULL, 7),
(2, 1, 2, 26, 44, 4, '2024-05-24 22:21:28', NULL, 7),
(3, 2, 2, 24, 44, 3, '2024-05-24 22:22:05', NULL, 7),
(4, 2, 4, 24, 44, 4, '2024-05-24 22:22:05', NULL, 7),
(5, 3, 6, 36, 44, 4, '2024-05-24 22:23:27', NULL, 7),
(6, 3, 7, 36, 44, 4, '2024-05-24 22:23:27', NULL, 7),
(7, 4, 5, 37, 44, 4, '2024-05-24 22:27:53', NULL, 7);

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
(1, 1, 24, 'pendiente', '2024-05-27 18:39:23');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `laboratorios_externos`
--

CREATE TABLE `laboratorios_externos` (
  `id` int(11) NOT NULL,
  `rif` int(11) NOT NULL,
  `razon_social` varchar(30) NOT NULL,
  `telefono` int(11) NOT NULL,
  `direccion` varchar(60) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `laboratorios_externos`
--

INSERT INTO `laboratorios_externos` (`id`, `rif`, `razon_social`, `telefono`, `direccion`) VALUES
(1, 123, '4099193235', 1, '123'),
(2, 409919324, 'sia2', 2, '1'),
(3, 1234, 'antt', 414668, 'oooo'),
(4, 1325, 'sia', 1234254, 'mmm'),
(5, 1344, 'mio', 4123445, 'aaa'),
(6, 1343, '234', 0, '999'),
(7, 1332, 'mioo', 0, 'asa'),
(8, 413, 'an', 12, 'ki');

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
  `expediente` int(11) NOT NULL,
  `fecha` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `ordenes`
--

INSERT INTO `ordenes` (`id`, `clave`, `orden`, `id_paciente`, `id_bio`, `expediente`, `fecha`) VALUES
(1, 'clave', 12, 26, 44, 220, '2024-05-24 22:21:28'),
(2, 'orden', 124, 24, 44, 221, '2024-05-24 22:22:05'),
(3, 'orden', 134, 36, 44, 222, '2024-05-24 22:23:27'),
(4, 'clave', 432, 37, 44, 224, '2024-05-24 22:27:53');

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
(34, 28146771, ' Fabian hijo ', 'El silencio', '04146308395', 'silvabravofabian@gmail.com', '2020-02-01', 'N', 'Hombre', NULL),
(35, 28582670, 'aa', 'Soler2', '04146680992', 'antonymanuelbeni77tez@gmail.com', '2024-05-01', 'N', 'Hombre', NULL),
(36, 26974694, 'Anyibel Benitez', 'soler', '04146681031', 'anyi@gmail.com', '1999-01-25', 'V', 'Mujer', NULL),
(37, 26974695, 'kkkkkkkkkk', 'qq', '04', 'aaa@gmail.com', '2003-05-10', 'V', 'Hombre', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rangos_detalle`
--

CREATE TABLE `rangos_detalle` (
  `id` int(11) NOT NULL,
  `id_det_ex` int(11) NOT NULL,
  `desde` int(11) DEFAULT NULL,
  `hasta` int(11) DEFAULT NULL,
  `inferior` decimal(12,2) NOT NULL,
  `superior` decimal(12,2) NOT NULL,
  `genero` varchar(10) DEFAULT NULL,
  `status` varchar(8) NOT NULL DEFAULT 'activo'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `rangos_detalle`
--

INSERT INTO `rangos_detalle` (`id`, `id_det_ex`, `desde`, `hasta`, `inferior`, `superior`, `genero`, `status`) VALUES
(1, 1, 0, 15, 11.20, 12.90, 'todos', 'activo'),
(2, 2, 0, 18, 35.00, 48.00, 'todos', 'activo'),
(3, 5, 0, 15, 4500.00, 12000.00, 'todos', 'activo'),
(4, 5, 15, 100, 5000.00, 10000.00, 'todos', 'activo'),
(5, 1, 15, 100, 11.50, 15.00, 'femenino', 'activo'),
(6, 1, 15, 100, 13.00, 17.00, 'masculino', 'activo'),
(7, 4, 0, 100, 150000.00, 450000.00, 'todos', 'activo'),
(8, 2, 18, 100, 36.00, 48.00, 'masculino', 'activo'),
(9, 2, 18, 100, 36.00, 48.00, 'femenino', 'activo'),
(10, 16, 0, 100, 0.00, 22.00, 'todos', 'activo'),
(11, 19, 0, 100, 0.00, 140.00, 'todos', 'activo'),
(12, 24, 0, 100, 40.00, 150.00, 'todos', 'activo'),
(13, 26, 0, 100, 6.00, 42.00, 'todos', 'activo'),
(14, 17, 0, 100, 70.00, 100.00, 'todos', 'activo'),
(15, 22, 0, 100, 0.00, 0.65, 'todos', 'activo'),
(16, 23, 0, 100, 2.50, 7.20, 'todos', 'activo'),
(17, 28, 0, 100, 80.00, 258.00, 'todos', 'activo'),
(18, 29, 0, 100, 2.30, 4.60, 'todos', 'activo'),
(19, 20, 0, 100, 0.50, 1.40, 'todos', 'activo'),
(20, 21, 0, 100, 0.00, 200.00, 'todos', 'activo'),
(21, 33, 0, 100, 0.00, 34.00, 'todos', 'activo'),
(22, 27, 0, 100, 0.00, 32.00, 'todos', 'activo'),
(23, 32, 0, 100, 8.50, 10.50, 'todos', 'activo'),
(24, 31, 0, 100, 0.00, 90.00, 'todos', 'activo'),
(25, 30, 0, 100, 65.00, 300.00, 'todos', 'activo'),
(26, 25, 0, 100, 0.00, 0.35, 'todos', 'activo'),
(27, 34, 0, 100, 0.00, 1.00, 'todos', 'activo'),
(28, 35, 0, 100, 1.60, 2.60, 'todos', 'activo'),
(29, 29, 0, 15, 4.00, 7.00, 'todos', 'activo'),
(30, 36, 0, 100, 50.00, 170.00, 'todos', 'activo'),
(31, 66, 0, 0, 82.00, 95.00, 'todos', 'activo'),
(32, 65, 0, 0, 4.00, 5.50, 'todos', 'activo'),
(33, 67, 0, 0, 28.00, 34.00, 'todos', 'activo'),
(34, 69, 0, 0, 32.00, 36.00, 'todos', 'activo'),
(35, 78, 0, 0, 6.00, 8.30, 'todos', 'activo');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `resultados_detalle`
--

CREATE TABLE `resultados_detalle` (
  `id` int(11) NOT NULL,
  `resultado` mediumtext NOT NULL,
  `id_det_ex` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `resultados_detalle`
--

INSERT INTO `resultados_detalle` (`id`, `resultado`, `id_det_ex`) VALUES
(1, 'NEUTRA (7)', 38),
(2, 'ACIDA (5)', 37),
(3, 'ACIDA (5)', 38),
(4, 'ALCALINA (8)', 38),
(5, 'ALCALINA (9)', 38),
(6, 'LIGERO TURBIO', 39),
(7, 'ACIDA (6)', 37),
(8, 'ACIDA (6.5)', 37),
(9, 'NEUTRA (7)', 37),
(10, 'ALCALINA (8)', 37),
(11, 'ALCALINA (9)', 37),
(12, 'ACIDA (6)', 38),
(13, 'TURBIO', 39),
(14, 'ACIDA (6.5)', 38),
(15, 'TRANSPARENTE', 39),
(16, 'SUI GENERI', 40),
(17, 'FETIDA', 40),
(18, '1005', 41),
(19, '1010', 41),
(20, '1000', 41),
(21, '1020', 41),
(22, '1025', 41),
(23, '1015', 41),
(24, '1030', 41),
(25, '10 ml', 42),
(26, '20 ml', 42),
(27, '30 ml', 42),
(28, '40 ml', 42),
(29, '80 ml', 42),
(30, '70 ml', 42),
(31, '60 ml', 42),
(32, '50 ml', 42),
(33, '90 ml', 42),
(34, '100 ml', 42),
(35, 'AMBAR', 43),
(36, 'VERDOSO', 43),
(37, 'AMARILLO', 43),
(38, 'ROJIZO', 43),
(39, 'AMARILLO CLARO', 43),
(40, 'NEGATIVA', 44),
(41, 'POSITIVA +++', 44),
(42, 'TRAZAS', 44),
(43, 'POSITIVA ++', 44),
(44, 'POSITIVA +', 44),
(45, 'NEGATIVA', 45),
(46, 'TRAZAS', 45),
(47, 'POSTIVA +', 45),
(48, 'POSITIVA ++', 45),
(49, 'POSITIVA +++', 45),
(50, 'NEGATIVA', 47),
(51, 'POSITIVA ++', 47),
(52, 'TRAZAS', 47),
(53, 'POSITIVA +', 47),
(54, 'POSITIVA +++', 47),
(55, 'NEGATIVA', 48),
(56, 'POSITIVA +', 48),
(57, 'TRAZAS', 46),
(58, 'NEGATIVO', 46),
(59, 'POSITIVA ++', 48),
(60, 'POSITIVA +++', 48),
(61, 'POSITIVO +', 46),
(62, 'POSITIVO ++', 46),
(63, 'POSITIVO +++', 46),
(64, 'NEGATIVO', 50),
(65, 'TRAZAS', 50),
(66, 'POSITIVO +', 50),
(67, 'POSITIVO ++', 50),
(68, 'NORMAL', 49),
(69, 'POSITIVO +++', 50),
(70, '2 mg/dl', 49),
(71, '4 mg/dl', 49),
(72, '8 mg/dl', 49),
(73, '12 mg/dl', 49),
(74, 'TRAZAS', 51),
(75, 'POSITIVA +', 51),
(76, 'NEGATIVA', 51),
(77, 'POSITIVA +++', 51),
(78, 'POSITIVA ++', 51),
(79, 'ESCASA', 54),
(80, 'MODERADA', 54),
(81, 'ABUNDANTE', 54),
(82, 'ABUNDANTES', 53),
(83, 'MODERADAS', 53),
(84, '0 - 2 X CP', 56),
(85, '1 - 3 X CP', 56),
(86, 'ESCASAS', 53),
(87, '1 - 5 X CP', 56),
(88, '0 - 4 X CP', 56),
(89, '3 - 6 X CP', 56),
(90, '2 - 6 X CP', 56),
(91, '2 - 4 X CP', 56),
(92, '10 - 20 X CP ', 56),
(93, 'INCONTABLES X CP', 56),
(94, '5 - 10 X CP', 56),
(95, 'ESCASAS', 55),
(96, 'MODERADAS', 55),
(97, '0 - 2 X CP', 57),
(98, '0 - 4 X CP', 57),
(99, 'ABUNDANTES', 55),
(100, '5 - 10 X CP', 57),
(101, '10 - 20 X CP', 57),
(102, '3 - 8 X CP', 57),
(103, '2 - 6 X CP', 57),
(104, '1 - 5 X CP', 57),
(105, '2 - 4 X CP', 57),
(106, '1 - 3 X CP', 57),
(107, 'INCONTABLES X CP', 57),
(108, 'NEGATIVO', 58),
(109, 'NO REACTIVO', 59),
(110, 'NEGATIVA: MENOR DE 6mg/L', 60),
(111, 'POSITIVA: 6 mg/L', 60),
(112, 'POSITIVA: 1/2DIL 12 mg/L', 60),
(113, 'POSITIVA: 1/4DIL 24 mg/L', 60),
(114, 'POSITIVA: 1/16DIL 96 mg/L', 60),
(115, 'POSITIVA: 1/8DIL 48 mg/L', 60),
(116, 'POSITIVA', 61),
(117, 'NEGATIVA', 61),
(118, 'NEGATIVO: MENOR DE 8', 62),
(119, 'POSITIVA 1/2 DIL 16 IU/mL', 62),
(120, 'POSITIVA 1/4 DIL 32IU/mL', 62),
(121, 'POSITIVA 1/16 DIL 128 IU/mL', 62),
(122, 'POSITIVA 1/8 DIL 64 IU/mL', 62),
(123, 'A', 63),
(124, 'B', 63),
(125, 'AB', 63),
(126, 'NEGATIVO', 64),
(127, 'O', 63),
(128, 'POSITIVO', 64),
(129, 'VALORES VERIFICADOS ', 68);

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
(1, 'HEMATOLOGIA'),
(2, 'BIOQUIMICA'),
(3, 'UROANALISIS'),
(4, 'HORMONAS'),
(5, 'INMUNO-SEROLOGIA'),
(6, 'COPROLOGIA'),
(7, 'BACTERIOLOGIA');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sede`
--

CREATE TABLE `sede` (
  `id` int(11) NOT NULL,
  `nombre` varchar(20) NOT NULL,
  `clave` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `sede`
--

INSERT INTO `sede` (`id`, `nombre`, `clave`) VALUES
(1, 'delicias2', 0),
(2, 'Indio Mara23', 0),
(3, '13256', 0),
(4, '133', 123);

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
(1, 'numero', 'EOSINOFILOS', '', 6, 'activo'),
(2, 'numero', 'MONOCITOS', '', 6, 'activo'),
(3, 'numero', 'BASOFILOS', '', 6, 'activo'),
(4, 'numero', 'CAYADO', '', 6, 'activo'),
(5, 'numero', 'ERITROBLASTOS', '', 6, 'activo'),
(6, 'numero', 'MIELOBLASTO', '', 6, 'activo'),
(7, 'numero', 'PROMIELOBLASTO', '', 6, 'activo'),
(8, 'numero', 'NEUTROFILOS', '', 15, 'activo'),
(9, 'numero', 'LINFOCITOS', '', 15, 'activo'),
(10, 'numero', 'MONOCITOS', '', 15, 'activo'),
(11, 'numero', 'EOSINOFILOS', '', 15, 'activo'),
(12, 'numero', 'BASOFILOS', '', 15, 'activo'),
(13, 'formula', 'TOTAL', 'NEUTROFILOS,+,LINFOCITOS,+,MONOCITOS,+,EOSINOFILOS', 15, 'activo');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `titulos`
--

CREATE TABLE `titulos` (
  `id` int(11) NOT NULL,
  `titulo` varchar(40) NOT NULL,
  `posicion` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
  `nivel` int(11) NOT NULL,
  `status` varchar(8) NOT NULL DEFAULT 'activo'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `pre_cedula`, `cedula`, `password`, `nombre`, `correo`, `telefono`, `bioanalista`, `direccion`, `foto_carnet`, `nivel`, `status`) VALUES
(5, 'V', 28146771, '$2b$04$YGVtJYbYnEnKemyDy3VBxu6xXeti08efB7wVyY0Pe9C/Zr81K4Kyq', 'Fabian Silva Bravo', 'silvabravofabian@gmail.com', '04146308395', 44, 'San Francisco', '', 3, 'activo'),
(6, 'V', 123, '$2b$04$Ih7JFMxYtPcWXrKupAjqnuLz.WSpE8l3Oaxofbl5IlKb4TfDbsbEi', 'prueba', 'prueba@gmail.com', '123', 44, 'prueba', '', 2, 'activo'),
(7, 'V', 28582670, '$2b$04$Ih7JFMxYtPcWXrKupAjqnuLz.WSpE8l3Oaxofbl5IlKb4TfDbsbEi', 'Antony Benitez', '', '04146680987', 44, '', '', 1, 'activo'),
(8, 'V', 2908, '$2b$04$Jwuj1No/o45BRs0B9cNzc.Li33bx3qEQjGGtpuO5.LwvEGEXDlSAG', 'anyi', 'asd@gmai.com', '04146680987', 0, 'kkkkkkkkk', '', 2, 'activo');

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
-- Indices de la tabla `examenes_externos`
--
ALTER TABLE `examenes_externos`
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
-- Indices de la tabla `laboratorios_externos`
--
ALTER TABLE `laboratorios_externos`
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
-- Indices de la tabla `sede`
--
ALTER TABLE `sede`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `subcaracteristicas_detalle`
--
ALTER TABLE `subcaracteristicas_detalle`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `titulos`
--
ALTER TABLE `titulos`
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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=86;

--
-- AUTO_INCREMENT de la tabla `detalles_examenes_paciente`
--
ALTER TABLE `detalles_examenes_paciente`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=54;

--
-- AUTO_INCREMENT de la tabla `detalles_ex_pendientes`
--
ALTER TABLE `detalles_ex_pendientes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `detalle_subcaracteristica_paciente`
--
ALTER TABLE `detalle_subcaracteristica_paciente`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `detalle_sub_ex_pd`
--
ALTER TABLE `detalle_sub_ex_pd`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `examenes`
--
ALTER TABLE `examenes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- AUTO_INCREMENT de la tabla `examenes_externos`
--
ALTER TABLE `examenes_externos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `examenes_paciente`
--
ALTER TABLE `examenes_paciente`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `examenes_pendientes`
--
ALTER TABLE `examenes_pendientes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `laboratorios_externos`
--
ALTER TABLE `laboratorios_externos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `niveles_usuario`
--
ALTER TABLE `niveles_usuario`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `ordenes`
--
ALTER TABLE `ordenes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `pacientes`
--
ALTER TABLE `pacientes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- AUTO_INCREMENT de la tabla `rangos_detalle`
--
ALTER TABLE `rangos_detalle`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT de la tabla `resultados_detalle`
--
ALTER TABLE `resultados_detalle`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=130;

--
-- AUTO_INCREMENT de la tabla `seccion_examen`
--
ALTER TABLE `seccion_examen`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `sede`
--
ALTER TABLE `sede`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `subcaracteristicas_detalle`
--
ALTER TABLE `subcaracteristicas_detalle`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT de la tabla `titulos`
--
ALTER TABLE `titulos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

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
