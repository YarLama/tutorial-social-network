import React, { useState } from 'react';
import './styles/style.scss'
import { MediaViewer, ModalWindow } from '../../../../components';
import { useWindowSize } from '../../../../app/hooks/UI/useWindowSize';
import { Button, IconButton, LoaderBlock, LoaderRing } from '../../../../UI';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks/redux/redux';
import { authSlice } from '../../../../app/store/reducers/AuthSlice';
import { useGetAllUsersQuery, useGetUserByIdQuery, userApi } from '../../../../app/api/userApi';
import { LoginForm } from '../../../../modules/LoginForm';

const TestPage = () => {

    const [testModalActive, setTestModalActive] = useState<boolean>(false);
    const [testModalActive1, setTestModalActive1] = useState<boolean>(false);
    const [testModalActive2, setTestModalActive2] = useState<boolean>(false);
    const [testModalActive3, setTestModalActive3] = useState<boolean>(false);
    const dispatch = useAppDispatch();
    const { authUserInfo: user } = useAppSelector(state => state.authReducer)
    const { isMobile } = useWindowSize();
    const ch1 = [
        {id:1, src: 'https://fastly.picsum.photos/id/237/200/300.jpg?hmac=TmmQSbShHz9CdQm0NkEjx1Dyh_Y984R9LpNrpvH2D_U'},
        {id:2, src: 'https://images.unsplash.com/photo-1535083988052-565ca9546643?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80'},
        {id:3, src: 'https://druzhniy-center.ru/wp-content/uploads/5/4/1/5414e8e32f62528febc49e9ab9e16819.png'},
        {id:4, src: 'http://risovach.ru/upload/2015/01/mem/muzhik_71675710_orig_.jpg'},
        {id:5, src: 'https://sun9-76.userapi.com/c10428/u164336031/-7/x_dbaa37aa.jpg', isAvatar: true},
    ]

    const handleClick = () => {
        dispatch(authSlice.actions.logout())
    }

    const {data: users, error} = useGetAllUsersQuery({});
    const {data, isLoading} = useGetUserByIdQuery(user.id);

    return (
        //<LoginPage />
        <>
        <p style={{'color': 'white', 'fontSize': '3em'}}>{`Ты зашел за ${user.email} и твой id: ${user.id}`}</p>
        <p style={{'color': 'white', 'fontSize': '3em'}}>
            {isLoading && 'ИДЕТ ЗАГРУЗКА'}
            {data && `Здраствуйте, ${data?.first_name} ${data?.middle_name ? data?.middle_name: ''} ${data?.last_name}`}
        </p>
        <IconButton icon='left' size='l' onClick={() => setTestModalActive(true)}/>
        <Button content='Выйти' onClick={handleClick}/>
        <Button content='Открыть медиа' onClick={() => setTestModalActive(true)}/>
        {/* <MediaViewer active={testModalActive} setActive={setTestModalActive} elements={ch1}/> */}
        <LoaderBlock color='minor' extraClassName='name'/>
        <LoaderBlock color='minor' extraClassName='avatar'/>
        <LoaderRing />
        <ModalWindow active={testModalActive3} setActive={setTestModalActive3} controls={false}>     
            <LoginForm />
            <p style={{'color': 'white', 'fontSize': '3em'}}>{`Ты зашел за ${user.email} и твой id: ${user.id}`}</p>
            <p style={{'color': 'white', 'fontSize': '3em'}}>{`Ты зашел за ${user.email} и твой id: ${user.id}`}</p>
            <p style={{'color': 'white', 'fontSize': '3em'}}>{`Ты зашел за ${user.email} и твой id: ${user.id}`}</p>
            <p style={{'color': 'white', 'fontSize': '3em'}}>{`Ты зашел за ${user.email} и твой id: ${user.id}`}</p>
            <p style={{'color': 'white', 'fontSize': '3em'}}>{`Ты зашел за ${user.email} и твой id: ${user.id}`}</p>
            <p style={{'color': 'white', 'fontSize': '3em'}}>{`Ты зашел за ${user.email} и твой id: ${user.id}`}</p>
            <p style={{'color': 'white', 'fontSize': '3em'}}>{`Ты зашел за ${user.email} и твой id: ${user.id}`}</p>
            <p style={{'color': 'white', 'fontSize': '3em'}}>{`Ты зашел за ${user.email} и твой id: ${user.id}`}</p>
            <p style={{'color': 'white', 'fontSize': '3em'}}>{`Ты зашел за ${user.email} и твой id: ${user.id}`}</p>
            <p style={{'color': 'white', 'fontSize': '3em'}}>{`Ты зашел за ${user.email} и твой id: ${user.id}`}</p>
            <p style={{'color': 'white', 'fontSize': '3em'}}>{`Ты зашел за ${user.email} и твой id: ${user.id}`}</p>
            <p style={{'color': 'white', 'fontSize': '3em'}}>{`Ты зашел за ${user.email} и твой id: ${user.id}`}</p>
            <p style={{'color': 'white', 'fontSize': '3em'}}>{`Ты зашел за ${user.email} и твой id: ${user.id}`}</p>
            <p style={{'color': 'white', 'fontSize': '3em'}}>{`Ты зашел за ${user.email} и твой id: ${user.id}`}</p>
            <p style={{'color': 'white', 'fontSize': '3em'}}>{`Ты зашел за ${user.email} и твой id: ${user.id}`}</p>
            <p style={{'color': 'white', 'fontSize': '3em'}}>{`Ты зашел за ${user.email} и твой id: ${user.id}`}</p>
            <p style={{'color': 'white', 'fontSize': '3em'}}>{`Ты зашел за ${user.email} и твой id: ${user.id}`}</p>
            <p style={{'color': 'white', 'fontSize': '3em'}}>{`Ты зашел за ${user.email} и твой id: ${user.id}`}</p>
            <p style={{'color': 'white', 'fontSize': '3em'}}>{`Ты зашел за ${user.email} и твой id: ${user.id}`}</p>
            <p style={{'color': 'white', 'fontSize': '3em'}}>{`Ты зашел за ${user.email} и твой id: ${user.id}`}</p>
        </ModalWindow>
        <p style={{'color': 'white', 'fontSize': '3em'}}>{`Ты зашел за ${user.email} и твой id: ${user.id}`}</p>
            <p style={{'color': 'white', 'fontSize': '3em'}}>{`Ты зашел за ${user.email} и твой id: ${user.id}`}</p>
            <p style={{'color': 'white', 'fontSize': '3em'}}>{`Ты зашел за ${user.email} и твой id: ${user.id}`}</p>
            <p style={{'color': 'white', 'fontSize': '3em'}}>{`Ты зашел за ${user.email} и твой id: ${user.id}`}</p>
            <p style={{'color': 'white', 'fontSize': '3em'}}>{`Ты зашел за ${user.email} и твой id: ${user.id}`}</p>
            <p style={{'color': 'white', 'fontSize': '3em'}}>{`Ты зашел за ${user.email} и твой id: ${user.id}`}</p>
            <p style={{'color': 'white', 'fontSize': '3em'}}>{`Ты зашел за ${user.email} и твой id: ${user.id}`}</p>
            <p style={{'color': 'white', 'fontSize': '3em'}}>{`Ты зашел за ${user.email} и твой id: ${user.id}`}</p>
            <p style={{'color': 'white', 'fontSize': '3em'}}>{`Ты зашел за ${user.email} и твой id: ${user.id}`}</p>
            <p style={{'color': 'white', 'fontSize': '3em'}}>{`Ты зашел за ${user.email} и твой id: ${user.id}`}</p>
            <p style={{'color': 'white', 'fontSize': '3em'}}>{`Ты зашел за ${user.email} и твой id: ${user.id}`}</p>
            <p style={{'color': 'white', 'fontSize': '3em'}}>{`Ты зашел за ${user.email} и твой id: ${user.id}`}</p>
            <p style={{'color': 'white', 'fontSize': '3em'}}>{`Ты зашел за ${user.email} и твой id: ${user.id}`}</p>
            <p style={{'color': 'white', 'fontSize': '3em'}}>{`Ты зашел за ${user.email} и твой id: ${user.id}`}</p>
            <p style={{'color': 'white', 'fontSize': '3em'}}>{`Ты зашел за ${user.email} и твой id: ${user.id}`}</p>
            <p style={{'color': 'white', 'fontSize': '3em'}}>{`Ты зашел за ${user.email} и твой id: ${user.id}`}</p>
            <p style={{'color': 'white', 'fontSize': '3em'}}>{`Ты зашел за ${user.email} и твой id: ${user.id}`}</p>
            <p style={{'color': 'white', 'fontSize': '3em'}}>{`Ты зашел за ${user.email} и твой id: ${user.id}`}</p>
            <p style={{'color': 'white', 'fontSize': '3em'}}>{`Ты зашел за ${user.email} и твой id: ${user.id}`}</p>
            <p style={{'color': 'white', 'fontSize': '3em'}}>{`Ты зашел за ${user.email} и твой id: ${user.id}`}</p>
        <Button content='Open Modal3' size='s' onClick={() => setTestModalActive3(true)}/><br/>
        </>
//         <div>
//             <Button content='Open Modal' size='s' onClick={() => setTestModalActive(true)}/><br/>
//             <Button content='Open Modal1' size='s' onClick={() => setTestModalActive1(true)}/><br/>
//             <Button content='Open Modal2' size='s' onClick={() => setTestModalActive2(true)}/><br/>
//       
        // <TestForm />
//             
//             <ModalWindow active={testModalActive} setActive={setTestModalActive}>
//                 <Button content='1' size='m'/>
//                 <Button content='2' size='m'/>
//                 <Button content='3' size='m'/>
//                 <Button content='4' size='m'/>
//                 <Button content='5' size='m'/>
//                 <Button content='6' size='m'/>
//                 <Button content='7' size='m'/>
//                 <Button content='8' size='m'/>
//                 <Button content='9' size='m'/>
//                 <Button content='10' size='m'/>
//                 <Button content='11' size='m'/>
//                 <Button content='12' size='m'/>
//                 <Button content='13' size='m'/>
//                 <Button content='14' size='m'/>
//                 <Button content='15' size='m'/>
//                 <Button content='16' size='m'/>
//                 <Button content='17' size='m'/>
//                 <Button content='18' size='m'/>
//             </ModalWindow>
//             <ModalWindow active={testModalActive1} setActive={setTestModalActive1}>
//             В качестве жанрообразующих признаков журналистских текстов современные исследователи журналистики (А.А. Тертычный, Г.В. Лазутина, С.С. Распопова, О.Р. Самарцев1 и др.) называют предмет отображения, цель творчества, метод исследования материала, широту отображения действительности, выразительно-изобразительные средства, используемые автором, отношение автора к описываемому предмету, а также вид творчества, имеющий особенности и на уровне журналистского материала, и на уровне способа работы над ним. Объем текста в качестве жанрообразующего признака ни в одной из работ не упоминается. При этом подразумевается, что некоторые жанры (очерк, специальный репортаж, журналистское расследование) предполагают скорее объемные тексты, нежели короткие. Объем текста традиционно считается производным от количества и качества собранной журналистом информации с учетом формата издания и принятых в нем размеров материалов.
// Однако в современной журналистской практике объем текста все чаще используют как одну из жанровых характеристик. Так, главный редактор интернет-издания Lenta.ru, Г. Тимченко (на момент публикации интервью 22 апреля 2013 г.), комментируя ребрендинг издания, упоминала в том числе «длинные тексты», которыми издание «приросло»2. Что касается конкретных цифр, то в качестве пороговых значений, начиная с которых текст становится «длинным», обычно указывают 1,5−2 тыс. слов3.
// Необходимость публикации «длинных текстов», или лонгридов (в данной работе эти термины употребляются как синонимы), объясняется стремлением изданий выделиться из общего информационного потока, преодолеть царящий в Интернете информационный шум4. С помощью новостей это сделать проблематично, так как даже эксклюзивная новость, опубликованная одним изданием, уже спустя минуты появляется на других сайтах. В результате поставщик эксклюзива оказывается в проигрыше. Взяв на себя основную часть издержек по подготовке данной новости, он получает лишь малую часть внимания аудитории, привлеченной этим сообщением. Изменить данную ситуацию не представляется возможным, так как авторское право на содержание журналистской информации не распространяется, и та же самая новость в пересказе другими словами – это формально новое произведение.
// В случае же с лонгридом пересказ материала далеко не эквивалентен исходному тексту. Прочитан будет именно лонгрид, и именно на него, а не на дайджесты-перепечатки будут ссылаться в социальных сетях. По данным одного из зарубежных исследований5, девять из десяти наиболее цитируемых в социальных сетях публикаций газеты «Нью-Йорк Таймс» (The New York Times) – лонгриды, а самой цитируемой публикацией, собравшей только в социальной сети Facebook свыше 47 тыс. перепостов, оказался лонгрид объемом в 10,5 тыс. слов об индонезийских нелегальных иммигрантах, стремящихся попасть в Австралию6
// И практикующие журналисты, и исследователи отмечают, что для привлечения внимания читателей в эпоху информационного изобилия и характерного для Интернета клипового восприятия лонгрид должен содержать уникальную и более яркую, более качественную информацию, чем обычно предлагается в СМИ. В англоязычной литературе это названо in-depth reporting7, что подразумевает значительное время и усилия журналиста, потраченные на исследование темы и − как результат − на ее новое понимание, недоступное при поверхностном ознакомлении с темой. Погружение же в тему позволяет затем передать это новое знание и новое понимание в тексте, что станет для читателя вознаграждением за время, потраченное на чтение лонгрида.
// Именно глубину погружения в тему, качество собранной информации следует считать главной жанровой характеристикой лонгрида. Журналист должен достичь экспертного понимания темы, что позволит ему заметить многие детали и сделать обоснованные выводы. Глубина погружения проявляется и в количестве источников информации, использованных при подготовке материала, и в количестве примеров, подтверждающих заявленный тренд, и в информативности текста, когда большой объем сочетается с высокой плотностью смысла
// Другая жанровая характеристика лонгрида – особенность темы. Для лонгридов характерны темы, выходящие за рамки одного конкретного случая или ситуации и описывающие либо новое явление, тренд, значимое изменение в обществе (например, суррогатное материнство в современной России8), либо системное расследование происходящего в какой-то сфере (например, участие российских войск в войне на востоке Украины в июле − сентябре 2014 г.9). Иногда к жанровым характеристикам лонгрида относят мультимедийное сопровождение при подаче материала в Интернете. В этой связи некоторые исследователи, например И.В. Стечкин10, называют лонгридами именно мультимедийные проекты, когда видеозаписи и иллюстрации, в том числе анимированные и сопровождающиеся звуковым фоном, являются составной частью опубликованного в Интернете материала. Наиболее известные примеры подобных материалов – проект «Снегопад» (Snowfall)11 американской газеты «Нью-Йорк Таймс» о группе горнолыжников и сноубордистов, попавших под лавину в горах на северо-западе США, и проект российского ИД «Коммерсантъ» «Земля отчуждения»12 о последствиях аварии на Чернобыльской АЭС. В обоих проектах сделана попытка создать с помощью мультимедийных средств эффект присутствия: в первом случае при открытии материала на экране монитора появляется снег со звуком метели, во втором из динамиков начинает раздаваться характерный писк счетчиков Гейгера, указывающий на наличие радиации. Но, с точки зрения автора данного исследования, мультимедийная составляющая жанровой характеристикой лонгрида не является, так как с использованием мультимедийных средств можно подавать тексты любого жанра. Тем более, что облегчение восприятия текстовой информации с помощью иллюстративности в прессе и мультимедийности в Интернете – тренд последних 10−20 лет. При этом, если в содержательном плане материал ничем не выделяется, ожидать повышенного интереса к нему только благодаря использованию мультимедиа стоит едва ли. Даже при качественном и оригинальном мультимедийном сопровождении материала интерес может возникнуть именно к этому сопровождению, а не к тексту, и, в лучшем случае, будет «длительный просмотр», а  не «длительное прочтение».
// Поэтому к жанровым характеристикам лонгрида необходимо отнести то существенное, что отличает этот вид текстов от материалов других жанров. Это системность темы (новое явление, системное расследование), глубокое и длительное исследование темы журналистом с использованием большого количества источников информации и большой объем текста в сочетании с высокой плотностью смысла и претензией на исчерпанность данной темы, сложность развить тему дальше, чем это сделал  автор. Что же касается оформления материала, то, несмотря на то что лонгриды хоть и принято сопровождать большим количеством иллюстраций, чем материалы многих других жанров, в число жанрообразующих характеристик нецелесообразно включать иллюстративность и мультимедийность. Лонгрид останется лонгридом, даже если материал будет представлять собой  только текст  без иллюстраций.
// Что же касается соотнесенности лонгридов с другими жанрами, то тексты этого жанра следует отнести к группе аналитических жанров. Близким к лонгриду является жанр аналитической статьи: их объединяет глубокое проникновение в тему, представление в материале разных точек зрения и достижение читателем нового понимания предмета после прочтения текста. Однако аналитическая статья обычно строится по принципу научного исследования: гипотеза, аргументы за и против и уточненная с учетом этого гипотеза, которую можно считать истинным знанием. Лонгрид же предусматривает более наглядную подачу материала за счет использования примеров и репортажных вставок, которые не только облегчают восприятие (аналитическая статья пишется в большей мере для интеллектуальной элиты, лонгрид – для широкой аудитории), но и обогащают его. Как именно это делается, будет показано ниже.
//             </ModalWindow>
//             <ModalWindow active={testModalActive2} setActive={setTestModalActive2} controlsConfirmLabel='Отправить' controlsCancelLabel='Отменить'>
//             <Button content='1' size='m'/>
//                 <Button content='2' size='m'/>
//                 <Button content='3' size='m'/>
//                 <Button content='4' size='m'/>
//                 <Button content='5' size='m'/>
//             </ModalWindow>
//             <IconButton icon='send' size='l'/><IconButton icon='send'/><IconButton icon='send' size='s'/><IconButton icon='send' size='xs'/><br />
//             <IconButton icon='left' size='l'/><IconButton icon='left'/><IconButton icon='left' size='s'/><IconButton icon='left' size='xs'/><br />
//             <IconButton icon='edit' size='l'/><IconButton icon='edit'/><IconButton icon='edit' size='s'/><IconButton icon='edit' size='xs'/><br />
//             <IconButton icon='cancel' size='l'/><IconButton icon='cancel'/><IconButton icon='cancel' size='s'/><IconButton icon='cancel' size='xs'/><br />
//             <IconButton icon='comment' size='l'/><IconButton icon='comment'/><IconButton icon='comment' size='s'/><IconButton icon='comment' size='xs'/><br />
//             <IconButton icon='like' size='l'/><IconButton icon='like'/><IconButton icon='like' size='s'/><IconButton icon='like' size='xs'/><br />
//             <IconButton icon='about' size='l'/><IconButton icon='about'/><IconButton icon='about' size='s'/><IconButton icon='about' size='xs'/><br />
//             <IconButton icon='logout' size='l'/><IconButton icon='logout'/><IconButton icon='logout' size='s'/><IconButton icon='logout' size='xs'/><br />
//             <IconButton icon='profile' size='l'/><IconButton icon='profile'/><IconButton icon='profile' size='s'/><IconButton icon='profile' size='xs'/><br />
//             <IconButton icon='attach' size='l'/><IconButton icon='attach'/><IconButton icon='attach' size='s'/><IconButton icon='attach' size='xs'/><br />
//             <IconButton icon='contact' size='l'/><IconButton icon='contact'/><IconButton icon='contact' size='s'/><IconButton icon='contact' size='xs'/><br />
//             <IconButton icon='chat' size='l'/><IconButton icon='chat'/><IconButton icon='chat' size='s'/><IconButton icon='chat' size='xs'/><br />
        
//             <Button content='Find' size='s'/><br/>
//             <Button content='Message' size='s' hide={isMobile}/><br/>
//             <Button content='Send Message' size='l'/><br/>
//             <Button content='Add to contact' size='l'/><br/>
//             <Button content='Registration' size='m'/><br/>
//             <Button content='Login' size='m'/><br/>
//         </div>
);
};

export {TestPage};