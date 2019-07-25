--
-- PostgreSQL database dump
--

-- Dumped from database version 10.8
-- Dumped by pg_dump version 11.3

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: Toiec; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE "Toiec" WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'C' LC_CTYPE = 'C';


ALTER DATABASE "Toiec" OWNER TO postgres;

\connect "Toiec"

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: testone; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.testone (
    code integer,
    question text,
    answer text,
    a text,
    b text,
    c text,
    d text,
    status integer,
    answer_code integer
);


ALTER TABLE public.testone OWNER TO postgres;

--
-- Name: testtwo; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.testtwo (
    code integer,
    question text,
    answer text,
    a text,
    b text,
    c text,
    d text,
    status integer,
    answer_code integer
);


ALTER TABLE public.testtwo OWNER TO postgres;

--
-- Data for Name: testone; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.testone (code, question, answer, a, b, c, d, status, answer_code) FROM stdin;
2	The ____ of a new chief financial officer at Veracore Industries was announced on April 6.	D đúng. Sau “the”: cần điền danh từ \n Dịch: Việc bổ nhiệm giám đốc tài chính mới ở Công ty Veracore đã được thông báo vào ngày 6 tháng 4.	A.appoint	B.appoints	C.appointed	D.appointment	0	4
3	Ms. Larensky is applying with several different agencies to obtain the permits ____ for the outdoor art event.	A đúng. Giải thích: câu này đã có các bộ phận chính, chủ ngữ, vị ngữ đầy đủ nên động từ thêm vào phía sau giống như 1 mệnh đề quan hệ rút gọn o bị động: which are required\nDịch: Bà Larensky đang nộp đơn với một số cơ quan khác nhau để có được giấy phép cần thiết cho sự kiện nghệ thuật ngoài trời.	A.required	B.requiring	C.requires	D.will require	0	1
1	Dr. Braun will write ___ letters only for interns who master every task expected of a junior copy editor.	B đúng. Vị trí cần điền là 1 danh từ để kết hợp với letter để tạo thành một danh từ ghép => chọn B Collocation, recommendation letter: thư giới thiệu \n Dịch: Dr. Braun sẽ viết thư giới thiệu chỉ cho những thực tập sinh đã thành thạo những công việc dành cho biên tập viên bản in cấp dưới.	A.recommends	B.recommendation	C.recommended	D.recommending	0	2
\.


--
-- Data for Name: testtwo; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.testtwo (code, question, answer, a, b, c, d, status, answer_code) FROM stdin;
3	The city council approved the bill to increase funding for its road improvement ___ .	Câu hỏi về từ vựng, tất cả là danh từ, xét về nghĩa project (dự án) là phù hợp nhất.\nDịch: Hội đồng thành phố đã chấp thuận dự luật tăng ngân sách cho dự án cải tiến đưòng bộ của thành phố.\n	A.Statement	B.Permission	C.Project	D.Ability	0	3
2	After working in Canada for ten years, Cha Joon has ___ to Seoul to plan the opening of an upscale restaurant.	Đây là câu hỏi từ vựng, tất cả đề là verbs, xét về nghĩa: return (tro về) là phù hợp nhất.\nDịch: Sau khi làm việc tại Canada trong mưòi năm, Cha Joon đã tro lại Seoul để lên kế hoạch mo một nhà hàng cao cấp.\n	A.Visited	B.Returned	C.Occurred	D.Related	0	2
1	The new furniture for the conference room is scheduled to be delivered ___ on Tuesday.	Đây là câu hỏi từ vựng, tất cả đề là adverbs, xét về nghĩa: early (sớm) là phù hợp nhất\nDịch: Đồ nội thất mới cho phòng hội thảo dự kiến sẽ được giao vào đầu ngày thứ Ba\n	A.Hardly	B.Comfortably	C.Early	D.Eagerly	0	3
\.


--
-- PostgreSQL database dump complete
--

